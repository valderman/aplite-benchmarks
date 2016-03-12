{-# LANGUAGE OverloadedStrings, BangPatterns #-}
import Haste
import Haste.DOM.JSString
import Haste.Events
import Haste.Graphics.Canvas
import qualified Haste.JSString as S
import Data.Bits
import Data.Int
import Data.IORef
import Control.Monad
import Pixels

{-# INLINE xs32 #-}
xs32 :: Int32 -> Int32
xs32 !x = x'' `xor` (x'' `shiftR` 5)
  where
    !x'   = x `xor` (x `shiftR` 13)
    !x''  = x' `xor` (x' `shiftL` 17)

{-# INLINE xs32_2 #-}
xs32_2 :: Int32 -> Int32 -> Int32 -> Int32
xs32_2 !oct !x !y = xs32 $ xs32 (oct*887) + xs32 (x*2251) + xs32 (y*7919)

{-# INLINE grad #-}
grad :: Int32 -> Int32 -> Int32 -> Double -> Double -> Double
grad !octhash !xi !yi !xf !yf =
  case xs32_2 octhash xi yi `rem` 8 of
    0 -> xf + yf
    1 -> yf - xf
    2 -> xf - yf
    3 -> negate xf - yf
    4 -> xf
    5 -> negate xf
    6 -> yf
    _ -> negate yf

{-# INLINE lerp #-}
lerp :: Double -> Double -> Double -> Double
lerp !a !b !t = a+t*(b-a)

{-# INLINE fade #-}
fade :: Double -> Double
fade !t = ((t * t) * t) * (t * (t * 6 - 15) + 10)

{-# INLINE perlin #-}
perlin :: Int32 -> Double -> Double -> Double
perlin !octhash !x !y =
    lerp (lerp a b u) (lerp c d u) v
  where
    !x0 = floor x
    !y0 = floor y
    !x1 = x0 + 1
    !y1 = y0 + 1
    !x0f = fromIntegral x0
    !y0f = fromIntegral y0
    !x1f = fromIntegral x1
    !y1f = fromIntegral y1
    !a = grad octhash x0 y0 (x-x0f) (y-y0f)
    !b = grad octhash x1 y0 (x-x1f) (y-y0f)
    !c = grad octhash x0 y1 (x-x0f) (y-y1f)
    !d = grad octhash x1 y1 (x-x1f) (y-y1f)
    !u = fade (decimalPart x)
    !v = fade (decimalPart y)

{-# INLINE decimalPart #-}
decimalPart :: Double -> Double
decimalPart !x = x - (fromIntegral (floor x :: Int))

perlinOct :: Int32 -> Double -> Double -> Double -> Double
perlinOct !octaves !p !x !y = go 1 1 1 0 0
  where
    go !oct !f !amp !tot !max_
      | oct <= octaves = go (oct+1) (f*2) (amp*p) (tot+val) (max_+amp)
      | otherwise      = tot/max_
        where val = (perlin (xs32 oct) (x*f) (y*f)*amp)

paint :: Canvas -> Int32 -> Int32 -> IORef Bool -> IORef Double -> IO ()
paint !can !off !len !ref !frames = do
  let off' = fromIntegral off
  keepGoing <- readIORef ref
  let c = fromColor $ RGB 255 255 255
  drawPixels can $ do
    forM_ [0..len-1] $ \x -> do
      forM_ [0..199] $ \y -> do
        let xf = fromIntegral x
            yf = fromIntegral y
            alpha = 0.5 - perlinOct 4 0.5 ((off'+xf)/75) (yf/75)
        setPixel (fromIntegral x) y c
        setPixelAlpha (fromIntegral x) y (truncate (clamp alpha*255))
  atomicModifyIORef' frames (\f -> (f+1, ()))
  when keepGoing $ void $ setTimer (Once 1) $ do
    paint can (off+3) len ref frames

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
