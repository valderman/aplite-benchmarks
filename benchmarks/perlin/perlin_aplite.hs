{-# LANGUAGE OverloadedStrings, BangPatterns, FlexibleInstances, OverloadedStrings, ScopedTypeVariables #-}
import Haste
import Haste.DOM.JSString
import Haste.Events
import Haste.Graphics.Canvas
import Haste.Graphics.AnimationFrame
import qualified Haste.JSString as S
import Haste.Foreign
import Data.Bits
import Data.Int
import Data.IORef
import Control.Monad
import Pixels
import Haste.Aplite

import Haste.Prim
import Data.Array.Unboxed
import Unsafe.Coerce

xs32 :: CExp Int32 -> Aplite (CExp Int32)
xs32 x = do
  x <- share x
  x' <- share $ x `xor` (x `shiftR` 13)
  x'' <- share $ x' `xor` (x' `shiftL` 17)
  share $ x'' `xor` (x'' `shiftR` 5)

xs32_2 :: CExp Int32 -> CExp Int32 -> CExp Int32 -> Aplite (CExp Int32)
xs32_2 oct x y = do
  oct <- share oct
  x <- share x
  y <- share y
  a <- xs32 (oct*887)
  b <- xs32 (x*2251)
  c <- xs32 (y*7919)
  xs32 $ a + b + c

grad :: CExp Int32
     -> CExp Int32 -> CExp Int32
     -> CExp Double -> CExp Double
     -> Aplite (CExp Double)
grad octhash xi yi xf yf = do
  val <- share =<< (#% 8) <$> xs32_2 octhash xi yi
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

lerp :: CExp Double -> CExp Double -> CExp Double -> Aplite (CExp Double)
lerp a b t = do
  a <- share a
  share $ a+t*(b-a)

fade :: CExp Double -> Aplite (CExp Double)
fade t = do
  t <- share t
  share $ ((t * t) * t) * (t * (t * 6 - 15) + 10)

perlin :: CExp Int32 -> CExp Double -> CExp Double -> Aplite (CExp Double)
perlin octhash x y = do
    x <- share x
    y <- share y
    a <- grad octhash x0i y0i (x-x0) (y-y0)
    b <- grad octhash x1i y0i (x-x1) (y-y0)
    c <- grad octhash x0i y1i (x-x0) (y-y1)
    d <- grad octhash x1i y1i (x-x1) (y-y1)
    u <- fade (decimalPart x)
    v <- fade (decimalPart y)
    l1 <- lerp a b u
    l2 <- lerp c d u
    lerp l1 l2 v
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

perlinOct :: CExp Int32
          -> CExp Double
          -> CExp Double
          -> CExp Double
          -> Aplite (CExp Double)
perlinOct octaves p x y = do
    rf <- initRef 1
    ramp <- initRef 1
    rtot <- initRef 0
    rmax <- initRef 0
    for (1, 1, Incl octaves) $ \oct -> do
      f <- getRef rf
      amp <- getRef ramp
      tot <- getRef rtot
      max_ <- getRef rmax
      octhash <- xs32 oct
      val <- perlin octhash (x*f) (y*f)
      setRef rf (f*2)
      setRef ramp (amp*p)
      setRef rtot (tot+val*amp)
      setRef rmax (max_+amp)
    tot <- getRef rtot
    max_ <- getRef rmax
    return (tot/max_)

runPerlin :: CExp Int32
          -> CExp Double
          -> CExp Int32
          -> CExp Int32
          -> Int32
          -> IOUArray Int32 Word32
          -> IO ()
runPerlin octaves p w h = aplite theTuning $ ppp octaves p w h

goPerlinGo :: Int32 -> IOUArray Int32 Word32 -> IO ()
goPerlinGo = runPerlin 4 0.5 200 200

paint :: Canvas -> IOUArray Int32 Word32 -> ImageDataHandle -> Int32 -> IORef Bool -> IORef Double -> IO ()
paint can pixels h off ref frames = do
  keepGoing <- readIORef ref
  goPerlinGo off pixels
  putImageData can h
  atomicModifyIORef' frames (\f -> (f+1, ()))
  when keepGoing $ void $ setTimer (Once 1) $ do
    paint can pixels h (off+3) ref frames

putImageData :: Canvas -> ImageDataHandle -> IO ()
putImageData = ffi "(function(c,d){c.getContext('2d').putImageData(d,0,0);})"

type ImageDataHandle = JSAny

createImageData :: Canvas -> Int -> Int -> IO (IOUArray Int32 Word32, ImageDataHandle)
createImageData = ffi "(function(c,x,y){var id = c.getContext('2d').createImageData(x,y); return [id.data, id];})"

printP :: CExp Int32
       -> CExp Double
       -> CExp Int32
       -> CExp Int32
       -> JSString
printP octaves p w h = compile theTuning $ ppp octaves p w h

ppp :: CExp Int32 -> CExp Double -> CExp Int32 -> CExp Int32 -> CExp Int32 -> Arr Int32 Word32 -> Aplite ()
ppp octaves p w h offset pixels = do
  for (0, 1, Excl w) $ \x -> do
    for (0, 1, Excl h) $ \y -> do
      alpha <- (0.5 -) <$> perlinOct octaves p (i2n (offset+x)/75) (i2n y/75)
      alpha' <- share $ alpha*255
      alpha'' <- ifE (alpha' #< 0)
                   (return 0)
                   (ifE (alpha' #> 255) (return 255) (return alpha'))
      let color = 0xffffff .|. (f2n alpha'' `shiftL` 24)
      setArr (y*w+x) color pixels

-- arrTest :: Int32 -> Double
arrTest :: IOUArray Int32 Double -> Int32 -> IO Double
arrTest = aplite theTuning $ \a sz -> do
  r <- initRef 0
  for (0, 1, Excl sz) $ \i -> do
    x <- getArr i a
    y <- getRef r
    setRef r (x+y)
  setArr 5 666 a
  getRef r

theTuning = defaultTuning -- asmjsTuning {explicitHeap = Just 0x100000}

main = do
  Just c <- getCanvasById "can"
  keepGoing <- newIORef True
  frames <- newIORef 0
  (pixels, h) <- createImageData c 200 200
  withElems ["stop", "reset"] $ \[stop, reset] -> do
    reset `onEvent` Click $ const $ do
      writeIORef keepGoing True
      paint c pixels h 0 keepGoing frames
    stop `onEvent` Click $ const (writeIORef keepGoing False)
  setTimer (Repeat 5000) $ do
    withElem "fps" $ \fps -> do
      f <- atomicModifyIORef' frames (\f -> (0, f/5))
      setProp fps "textContent" (S.append (toJSString f) " FPS")
  paint c pixels h 0 keepGoing frames
