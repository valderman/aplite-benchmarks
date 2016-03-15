{-# LANGUAGE CPP #-}
import Haste
import Haste.Aplite
import Haste.Performance
import Control.Exception

type Mat = IOUArray Word32 Double

matMult :: Word32 -> Mat -> Mat -> Mat -> IO ()
matMult = apliteWith TUNING $ \m m1 m2 out -> do
  for (0, 1, Excl m) $ \i -> do
    for (0, 1, Excl m) $ \j -> do
      sumRef <- initRef 0
      for (0, 1, Excl m) $ \k -> do
        x <- getArr m1 (i*m+k)
        y <- getArr m2 (k*m+j)
        modifyRef sumRef (+(x*y))
      getRef sumRef >>= setArr out (i*m+j)

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
