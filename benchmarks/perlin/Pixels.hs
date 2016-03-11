{-# LANGUAGE CPP, OverloadedStrings, MagicHash, UnboxedTuples #-}
module Pixels (
    Pixels,
    PixelColor,
    toColor, fromColor, fromWord, toWord, clamp,
    drawPixels,
    getWidth, getHeight,
    setPixel,
    setPixelRed, setPixelGreen, setPixelBlue, setPixelAlpha
  ) where
import Data.Bits
import GHC.Word
import GHC.IO
import GHC.Types
import Haste
import Haste.DOM.JSString
import Haste.Foreign
import Haste.Graphics.Canvas

-- For fast access to ByteArrays
import GHC.Prim

-- | The color of a pixel.
newtype PixelColor = PixelColor {toWord :: Word32}

-- | Convert a 32 bit RGBA value into a pixel color.
fromWord :: Word32 -> PixelColor
fromWord = PixelColor

{-# INLINE clamp #-}
-- | Clamp a double to @(0,1)@
clamp :: Double -> Double
clamp = min 1 . max 0

-- | Convert a canvas 'Color' value to a pixel color.
{-# INLINE fromColor #-}
fromColor :: Color -> PixelColor
fromColor (RGBA r g b a) =
  PixelColor $ fromIntegral $ (r .&. 0xff) .|. ((g  .&. 0xff) `shiftL` 8)
                                           .|. ((b  .&. 0xff) `shiftL` 16)
                                           .|. ((a' .&. 0xff) `shiftL` 24)
  where
    a' = truncate (255*clamp a)
fromColor (RGB r g b) =
  PixelColor $ fromIntegral $ (r .&. 0xff) .|. ((g .&. 0xff) `shiftL` 8)
                                           .|. ((b .&. 0xff) `shiftL` 16)
                                           .|. 0xff000000


#ifdef __HASTE__
-- | Convert a pixel color back into a canvas 'Color'.
{-# INLINE toColor #-}
toColor :: PixelColor -> Color
toColor (PixelColor (W32# w)) = RGBA r g b (a/255)
  where
    r = I# (unsafeCoerce# (and# w 0xff##))
    g = I# (unsafeCoerce# (and# (uncheckedShiftRL# w 8#) 0xff##))
    b = I# (unsafeCoerce# (and# (uncheckedShiftRL# w 16#) 0xff##))
    a = D# (unsafeCoerce# (and# (uncheckedShiftRL# w 24#) 0xff##))
#else
toColor (PixelColor w) = RGBA r g b (a / 255)
  where
    r = fromIntegral $ w .&. 0xff
    g = fromIntegral $ (w `shiftR` 8)  .&. 0xff
    b = fromIntegral $ (w `shiftR` 16) .&. 0xff
    a = fromIntegral $ (w `shiftR` 24) .&. 0xff
#endif

type ImageData = JSAny
type RawByteArray = JSAny

putImageData :: Canvas -> ImageData -> IO ()
putImageData = ffi "(function(c,d){c.getContext('2d').putImageData(d,0,0);})"

createImageData :: Canvas -> Int -> Int -> IO ImageData
createImageData = ffi "(function(c,x,y){return c.getContext('2d').createImageData(x,y);})"

createImageDataByteArray :: ImageData -> IO RawByteArray
createImageDataByteArray =
  ffi "(function(d){return wrapByteArr(d.data.buffer);})"

-- | Draw raw pixels on top of a canvas. Any pixels not drawn to will end up
--   transparent.
drawPixels :: Canvas -> Pixels () -> IO ()
drawPixels can (Pixels m) = do
  Just w <- fromJSString <$> getProp can "width"
  Just h <- fromJSString <$> getProp can "height"
  imgdata <- createImageData can w h
  bs <- createImageDataByteArray imgdata
  m (unsafeCoerce# bs) w h
  putImageData can imgdata

newtype Pixels a = Pixels (MutableByteArray# RealWorld -> Int -> Int -> IO a)

instance Functor Pixels where
  {-# INLINE fmap #-}
  fmap f (Pixels m) = Pixels (\bs w h -> fmap f (m bs w h))

instance Applicative Pixels where
  {-# INLINE (<*>) #-}
  Pixels f <*> Pixels x = Pixels $ \bs w h -> do
    f' <- f bs w h
    f' <$> x bs w h

  {-# INLINE pure #-}
  pure x = Pixels (\_ _ _ -> pure x)

instance Monad Pixels where
  {-# INLINE return #-}
  return = pure

  {-# INLINE (>>=) #-}
  Pixels m >>= f = Pixels $ \bs w h -> do
    x <- m bs w h
    case f x of
      Pixels y -> y bs w h

{-# INLINE writeW32 #-}
writeW32 :: MutableByteArray# RealWorld -> Int -> Word32 -> IO ()
writeW32 a (I# ix) (W32# w) = IO (\s -> (# writeWord32Array# a ix w s, () #))

{-# INLINE writeW8 #-}
writeW8 :: MutableByteArray# RealWorld -> Int -> Word8 -> IO ()
writeW8 a (I# ix) (W8# w) = IO (\s -> (# writeWord8Array# a ix w s, () #))

{-# INLINE setPixel #-}
setPixel :: Int -> Int -> PixelColor -> Pixels ()
setPixel x y (PixelColor p) = Pixels $ \bs w _ -> writeW32 bs (y*w+x) p

{-# INLINE setPixelRed #-}
setPixelRed :: Int -> Int -> Word8 -> Pixels ()
setPixelRed x y r = Pixels $ \bs w _ -> writeW8 bs ((y*w+x)*4+x) r

{-# INLINE setPixelGreen #-}
setPixelGreen :: Int -> Int -> Word8 -> Pixels ()
setPixelGreen x y g = Pixels $ \bs w _ -> writeW8 bs ((y*w+x)*4+1) g

{-# INLINE setPixelBlue #-}
setPixelBlue :: Int -> Int -> Word8 -> Pixels ()
setPixelBlue x y b = Pixels $ \bs w _ -> writeW8 bs ((y*w+x)*4+2) b

{-# INLINE setPixelAlpha #-}
setPixelAlpha :: Int -> Int -> Word8 -> Pixels ()
setPixelAlpha x y a = Pixels $ \bs w _ -> writeW8 bs ((y*w+x)*4+3) a

{-# INLINE getWidth #-}
getWidth :: Pixels Int
getWidth = Pixels $ \_ w _ -> return w

{-# INLINE getHeight #-}
getHeight :: Pixels Int
getHeight = Pixels $ \_ _ h -> return h
