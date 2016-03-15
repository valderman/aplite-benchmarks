{-# LANGUAGE CPP #-}
import Haste
import Haste.Performance
import Haste.Aplite

sort :: Length -> IOUArray Index Int32 -> IO ()
sort = apliteWith TUNING $ \len arr -> do
  for (0, 1, Excl (len-1)) $ \j -> do
    minIx <- initRef j
    min <- initRef =<< getArr arr j
    for (j+1, 1, Excl len) $ \i -> do
      x <- getArr arr i
      min' <- getRef min
      iff (x #< min')
        (setRef minIx i >> setRef min x)
        (return ())
    ix <- getRef minIx
    iff (ix #!= j)
      (swap arr ix j)
      (return ())
  where
    swap :: Arr Index Int32 -> CExp Index -> CExp Index -> Aplite ()
    swap arr i j = do
      x <- getArr arr i
      getArr arr j >>= setArr arr i
      setArr arr j x

size :: Num a => a
size = 50000

main = do
  s <- newSeed
  arr <- newListArray (0, size-1) (take size $ randomRs (-100,100) s)
  prep <- newListArray (0, 1) [0]
  sort 1 prep
  t <- now
  sort size arr
  t' <- now
  print (t'-t)
