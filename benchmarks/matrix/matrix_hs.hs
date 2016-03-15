{-# LANGUAGE BangPatterns, CPP #-}
import Haste
import Haste.Aplite
import Haste.Performance
import Control.Exception

type Mat = IOUArray Word32 Double

matMult :: Word32 -> Mat -> Mat -> Mat -> IO ()
matMult m m1 m2 out = go 0 0 0 0
{-  forM_ [0 .. m-1] $ \i -> do
    forM_ [0 .. n-1] $ \j -> do
      res <- foldM (step i j) 0 [0 .. m-1]
      writeArray out (i*m+j) res
-}
  where
    {-# INLINE step #-}
    step :: Word32 -> Word32 -> Double -> Word32 -> IO Double
    step !i !j !sum !k = do
      x <- readArray m1 (i*m+k)
      y <- readArray m2 (k*m+j)
      return $! sum + x*y

    go :: Word32 -> Word32 -> Double -> Word32 -> IO ()
    go !i !j !sum !k
      | k >= m    = do
          writeArray out (i*m+j) sum
          go i (j+1) 0 0
      | j >= m    = do
          go (i+1) 0 0 0
      | i >= m    = do
          return ()
      | otherwise = do
          x <- readArray m1 (i*m+k)
          y <- readArray m2 (k*m+j)
          go i j (sum + x*y) (k+1)

size = 600

main = flip catch (\(SomeException e) -> print e) $ do
  a <- newArray_ (0, size*size-1)
  b <- newArray_ (0, size*size-1)
  out <- newArray_ (0, size*size-1)
  matMult size a b out
  t <- now
  matMult size a b out
  t' <- now
  readArray out (size*size-1) >>= print
  print (t'-t)
