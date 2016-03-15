{-# LANGUAGE CPP #-}
import Prelude hiding (break)
import Haste.Aplite
import Haste
import Haste.Performance

type Length = Word32

factors :: Double -> IOUArray Word32 Double -> IO ()
factors = apliteWith TUNING facs

facs :: CExp Double -> Arr Word32 Double -> Aplite ()
facs num fs = do
    ixr <- initRef 0
    nr <- initRef num
    while (pure true) $ do
      n <- getRef nr
      root <- share $ sqrt_ n
      x <- ifE (n `fmod` 2 #== 0)
             (return 2)
             (iterateOdds n root)
      x <- ifE (x #<= root)
             (return x)
             (return n)
      pushFactor fs ixr x
      iff (n #== x)
        (break)
        (setRef nr (n / x))
  where
    pushFactor :: Arr Word32 Double -> Ref Word32 -> CExp Double -> Aplite ()
    pushFactor fs ixr f = do
      ix <- getRef ixr
      setRef ixr (ix+1)
      setArr fs ix f

    iterateOdds :: CExp Double -> CExp Double -> Aplite (CExp Double)
    iterateOdds n root = do
      r <- initRef 3
      while (pure true) $ do
        x <- getRef r
        iff (f2n n `fmod` f2n x #== 0)
          (break)
          (return ())
        setRef r (x+2)
        iff (x+2 #>= root)
          (break)
          (return ())
      getRef r

main = do
  arr <- newArray (0, 10) 0
  factors big arr
  t <- now
  factors big arr
  t' <- now
  getElems arr >>= print
  print (t'-t)

big = 5467154436746477
