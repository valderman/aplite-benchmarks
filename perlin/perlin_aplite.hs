{-# LANGUAGE OverloadedStrings, BangPatterns #-}
import Haste
import Haste.DOM.JSString
import Haste.Events
import Haste.Graphics.Canvas
import Haste.Graphics.AnimationFrame
import qualified Haste.JSString as S
import Data.Bits
import Data.Int
import Data.IORef
import Control.Monad
import Pixels
import Haste.Aplite

import Unsafe.Coerce

xs32 :: CExp Int32 -> CExp Int32
xs32 !x =
    x'' `xor` (x'' `shiftR` 5)
  where
    !x'  = x `xor` (x `shiftR` 13)
    !x'' = x' `xor` (x' `shiftL` 17)

xs32_2 :: CExp Int32 -> CExp Int32 -> CExp Int32 -> CExp Int32
xs32_2 oct x y = xs32 $ xs32 (oct*887) + xs32 (x*2251) + xs32 (y*7919)

grad :: CExp Int32
     -> CExp Int32 -> CExp Int32
     -> CExp Double -> CExp Double
     -> Aplite Double
grad octhash xi yi xf yf = do
  r <- initRef $ xs32_2 octhash xi yi #% 8
  val <- getRef r
  ifE (val #== 0)
    (pure $ xf + yf) $
    ifE (val #== 1)
      (pure $ yf - xf) $
      ifE (val #== 2)
        (pure $ xf - yf) $
        ifE (val #== 3)
          (pure $ negate xf - yf) $
          ifE (val #== 4)
            (pure xf) $
            ifE (val #== 5)
              (pure $ negate xf) $
              ifE (val #== 6)
                (pure yf) $
                (pure $ negate yf)

lerp :: CExp Double -> CExp Double -> CExp Double -> CExp Double
lerp a b t = a+t*(b-a)

fade :: CExp Double -> CExp Double
fade t = ((t * t) * t) * (t * (t * 6 - 15) + 10)

perlin :: CExp Int32 -> CExp Double -> CExp Double -> Aplite Double
perlin octhash x y = do
    a <- grad octhash x0i y0i (x-x0) (y-y0)
    b <- grad octhash x1i y0i (x-x1) (y-y0)
    c <- grad octhash x0i y1i (x-x0) (y-y1)
    d <- grad octhash x1i y1i (x-x1) (y-y1)
    u <- share $ fade (decimalPart x)
    v <- share $ fade (decimalPart y)
    pure (lerp (lerp a b u) (lerp c d u) v)
  where
    x0i = f2n x0
    y0i = f2n y0
    x1i = f2n x1
    y1i = f2n y1
    x0 = floor_ x
    y0 = floor_ y
    x1 = x0 + 1
    y1 = y0 + 1

decimalPart :: CExp Double -> CExp Double
decimalPart x = x - floor_ x

{- completely unrolled
perlinOct :: Int32
          -> Double
          -> Double
          -> Double
          -> Double
perlinOct octaves p =
  aplite defaultTuning $ \x y -> do
    let go :: Int32 -> Double -> Double
           -> CExp Double -> CExp Double
           -> Aplite Double
        go !oct !f !amp !tot !max_
          | oct <= octaves = do
              let amp' = realToFrac amp :: CExp Double
                  f'   = realToFrac f :: CExp Double
              octhash <- xs32 (fromIntegral oct)
              val <- perlin octhash (x*f') (y*f')
              go (oct+1) (f*2) (amp*p) (tot+val*amp') (max_+amp')
          | otherwise      = pure (tot / max_)
    go 1 1 1 0 0
-}
perlinOct :: CExp Int32
          -> CExp Double
          -> Double
          -> Double
          -> Double
perlinOct octaves p =
  aplite defaultTuning $ \x y -> do
    rf <- initRef 1
    ramp <- initRef 1
    rtot <- initRef 0
    rmax <- initRef 0
    for (1, 1, Incl octaves) $ \oct -> do
      f <- getRef rf
      amp <- getRef ramp
      tot <- getRef rtot
      max_ <- getRef rmax
      octhash <- share $ xs32 oct
      val <- perlin octhash (x*f) (y*f)
      setRef rf (f*2)
      setRef ramp (amp*p)
      setRef rtot (tot+val*amp)
      setRef rmax (max_+amp)
    tot <- getRef rtot
    max_ <- getRef rmax
    return (tot/max_)

goPerlinGo :: Double -> Double -> Double
goPerlinGo = perlinOct 4 0.5

paint :: Canvas -> Int32 -> Int32 -> IORef Bool -> IORef Double -> IO ()
paint !can !off !len !ref !frames = do
  let off' = fromIntegral off
  keepGoing <- readIORef ref
  let c = fromColor $ RGB 255 255 255
  drawPixels can $ do
    forM_ [0 .. fromIntegral len-1] $ \x -> do
      forM_ [0 .. 199] $ \y -> do
        let xf = fromIntegral x
            yf = fromIntegral y
            alpha = 0.5 - goPerlinGo ((off'+xf)/75) (yf/75)
        setPixel (fromIntegral x) (fromIntegral y) c
        setPixelAlpha (fromIntegral x) (fromIntegral y) (truncate (clamp alpha*255))
  atomicModifyIORef' frames (\f -> (f+1, ()))
--  when keepGoing $ void $ requestAnimationFrame $ const $ do
--    paint can (off+3) len ref frames

printP :: Int32 -> CExp Double -> JSString
printP octaves p = compile asmjsTuning $ \x y -> do
  rf <- initRef 1
  ramp <- initRef 1
  rtot <- initRef 0
  rmax <- initRef 0
  for (1, 1, Incl $ fromIntegral octaves) $ \oct -> do
    f <- getRef rf
    amp <- getRef ramp
    tot <- getRef rtot
    max_ <- getRef rmax
    octhash <- share $ xs32 oct
    val <- perlin octhash (x*f) (y*f)
    setRef rf (f*2)
    setRef ramp (amp*p)
    setRef rtot (tot+val*amp)
    setRef rmax (max_+amp)
  tot <- getRef rtot
  max_ <- getRef rmax
  return (tot/max_)

main = do
  Just c <- getCanvasById "can"
  keepGoing <- newIORef True
  frames <- newIORef 0
  withElems ["stop", "reset"] $ \[stop, reset] -> do
    reset `onEvent` Click $ const $ do
      writeIORef keepGoing True
      paint c 0 200 keepGoing frames
    stop `onEvent` Click $ const (writeIORef keepGoing False)
  setTimer (Repeat 5000) $ do
    withElem "fps" $ \fps -> do
      f <- atomicModifyIORef' frames (\f -> (0, f/5))
      setProp fps "textContent" (S.append (toJSString f) " FPS")
  paint c 0 200 keepGoing frames
