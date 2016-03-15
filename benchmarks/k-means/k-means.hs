{-# LANGUAGE OverloadedStrings #-}
import Haste
import Haste.DOM.JSString
import Haste.Graphics.Canvas
import KMeans
import Data.Array.IO
import Data.Word
import Control.Exception
import Haste.Aplite
import Haste.Performance

size = 100000

thepoints :: Seed -> Seed -> [Double]
thepoints s1 s2 =
  concat $ zipWith (\a b -> [a, b]) (randomRs (0,250) s1) (randomRs (0,125) s2)

prepKMeans clusters = do
  sizes <- newArray (0,4) 0
  pts <- newArray (0,1) 0
  let km = kMeans clusters
  km 1 pts sizes
  return km

main = flip catch (\(SomeException e) -> print e) $ do
  let s1 = mkSeed 123
      s2 = mkSeed 456
  points <- newListArray (0, size*2-1) (thepoints s1 s2)
  sizes <- newArray (0, 4) 0
  let s3 = mkSeed 789
      s4 = mkSeed 101112
  let pts = take 5 $ zip [fromIntegral (r :: Int) | r <- randomRs (0,250) s1]
                         [fromIntegral (r :: Int) | r <- randomRs (0,125) s2]
  km <- prepKMeans pts
  t <- now
  km size points sizes
  t' <- now
--  pts <- mkPoints <$> getElems (points :: IOUArray Word32 Double)
  ixs <- getElems (sizes :: IOUArray Word32 Word32)
  print ixs
  print (t'-t)

--  Just c <- getCanvasById "can"
--  render c $ drawPts colors pts (map fromIntegral ixs)

mkPoints :: [Double] -> [Point]
mkPoints (x:y:xs) = (x, y) : mkPoints xs
mkPoints _        = []

colors =
  [ RGB 255 0 0
  , RGB 0 255 0
  , RGB 0 0 255
  , RGB 0 0 0
  , RGB 255 255 0
  , RGB 255 0 255
  , RGB 0 255 255
  ]

drawPts :: [Color] -> [Point] -> [Int] -> Picture ()
drawPts = go 0
  where
    go :: Int -> [Color] -> [Point] -> [Int] -> Picture ()
    go 0 (c:cs) ps (i:is) = color c $ go i cs ps is
    go i cs ((x,y):ps) is = fill (circle (x*4,y*4) 2) >> go (i-1) cs ps is
    go _ _ _ _            = return ()
