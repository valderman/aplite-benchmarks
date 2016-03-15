{-# LANGUAGE CPP #-}
import Haste
import Haste.Performance
import Haste.Aplite

sort :: Length -> IOUArray Index Int32 -> IO ()
sort len arr = do
  forM_ [0 .. len-2] $ \j -> do
    min <- readArray arr j
    minIx <- findMin (j+1) min j
    if minIx /= j
      then swap minIx j
      else return ()
    
  where
    swap :: Index -> Index -> IO ()
    swap i j = do
      x <- readArray arr i
      readArray arr j >>= writeArray arr i
      writeArray arr j x

    findMin :: Index -> Int32 -> Index -> IO Index
    findMin i min minIx
      | i == len = do
          return minIx
      | otherwise = do
          x <- readArray arr i
          if x < min
            then findMin (i+1) x i
            else findMin (i+1) min minIx

size :: Num a => a
size = 50000

main = do
  s <- newSeed
  arr <- newListArray (0, size-1) (take size $ randomRs (-100,100) s)
  t <- now
  sort size arr
  t' <- now
  print (t'-t)
