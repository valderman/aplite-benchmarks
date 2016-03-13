{-# LANGUAGE BangPatterns, CPP #-}
module KMeans (kMeans, kMeans') where
import Haste.Aplite

-- | Find k clusters in an array of points, where @length clusters = k@.
--   The points will be written in cluster order in the given array, and an
--   array of sizes for cluster 0, cluster 1, etc. is returned.
--   Points are stored in pairs; the nth x and y coordinates can be found at
--   indices n*2 and n*2+1 respectively.
kMeans :: [Point]
       -> Word32
       -> IOUArray Word32 Double
       -> IOUArray Word32 Word32
       -> IO ()
kMeans clusters = aplite tuning (kMeans' clusters)

tuning = TUNING

kMeans' :: [Point] -> CExp Word32 -> Arr Word32 Double -> Arr Word32 Word32 -> Aplite ()
kMeans' clusters npoints points sizes = do
  cs <- mapM (mkCluster npoints) clusters
  while (onePass cs points npoints) (return ())
  copyOutPoints cs points
  copyOutSizes cs sizes

copyOutPoints :: [Cluster] -> Arr Word32 Double -> Aplite ()
copyOutPoints cs arr = go 0 cs
  where
    go :: CExp Word32 -> [Cluster] -> Aplite ()
    go off (c:cs) = do
      npts <- getRef (clusterNPts c)
      for (0, 1, Excl npts) $ \i -> do
        x <- ptX (clusterPts c) i
        y <- ptY (clusterPts c) i
        setPt arr (i+off) (x, y)
      go (off+npts) cs
    go _ _ = do
      return ()

copyOutSizes :: [Cluster] -> Arr Word32 Word32 -> Aplite ()
copyOutSizes cs arr = go (0 :: Int) cs
  where
    go :: Int -> [Cluster] -> Aplite ()
    go !ix (c:cs) = do
      npts <- getRef (clusterNPts c)
      setArr arr (fromIntegral ix) npts
      go (ix+1) cs
    go _ _ = do
      return ()

mkCluster :: CExp Word32 -> Point -> Aplite Cluster
mkCluster maxpts mean = Cluster <$> newPtRef mean
                                <*> newArr (maxpts*2)
                                <*> initRef 0

ptX :: Arr Word32 Double -> CExp Word32 -> Aplite (CExp Double)
ptX pts i = getArr pts (i*2)

ptY :: Arr Word32 Double -> CExp Word32 -> Aplite (CExp Double)
ptY pts i = getArr pts (i*2+1)

type Point = (CExp Double, CExp Double)
type PointRef = (Ref Double, Ref Double)

newPtRef :: Point -> Aplite PointRef
newPtRef (x, y) = liftM2 (,) (initRef x) (initRef y)

getPtRef :: PointRef -> Aplite Point
getPtRef (x, y) = liftM2 (,) (getRef x) (getRef y)

setPtRef :: PointRef -> Point -> Aplite ()
setPtRef (xr, yr) (x, y) = setRef xr x >> setRef yr y

data Cluster = Cluster
  { clusterMean :: PointRef
  , clusterPts  :: Arr Word32 Double
  , clusterNPts :: Ref Word32
  }

onePass :: [Cluster] -> Arr Word32 Double -> CExp Word32 -> Aplite (CExp Bool)
onePass (c:cs) pts npts = do
  -- Zero out cluster assignments
  mapM_ (\c -> setRef (clusterNPts c) 0) (c:cs)

  -- Assign all points to the closest cluster
  for (0, 1, Excl npts) $ \i -> do
    pt <- liftM2 (,) (ptX pts i) (ptY pts i)
    mean <- getPtRef (clusterMean c)
    d <- share $ dist mean pt
    assignClosest d c cs pt

  -- Update the mean of each cluster
  changed <- initRef false
  ptref <- liftM2 (,) newRef newRef
  forM (c:cs) $ \c -> do
    meanPoint c ptref
    pt <- getPtRef ptref
    mean <- getPtRef (clusterMean c)
    iff (not_ $ eqPoint mean pt)
      (setRef changed true >> setPtRef (clusterMean c) pt)
      (return ())
  getRef changed

assignClosest :: CExp Double -> Cluster -> [Cluster] -> Point -> Aplite ()
assignClosest curDist curCluster (cluster:cs) pt = do
  mean <- getPtRef (clusterMean cluster)
  d <- share $ dist mean pt
  iff (d #< curDist)
    (assignClosest d cluster cs pt)
    (assignClosest curDist curCluster cs pt)
assignClosest _ cluster _ pt = do
  addPt (clusterPts cluster) (clusterNPts cluster) pt

meanPoint :: Cluster -> PointRef -> Aplite ()
meanPoint c (xout, yout) = do
  len <- getRef (clusterNPts c)
  xsum <- initRef 0
  ysum <- initRef 0
  for (0, 1, Excl len) $ \i -> do
    x <- ptX (clusterPts c) i
    y <- ptY (clusterPts c) i
    modifyRef xsum (+x)
    modifyRef ysum (+y)
  x <- getRef xsum
  y <- getRef ysum
  setRef xout (x/(i2n len))
  setRef yout (y/(i2n len))

setPt :: Arr Word32 Double
      -> CExp Word32
      -> (CExp Double, CExp Double)
      -> Aplite ()
setPt arr ix (x, y) = do
  setArr arr (ix*2) x
  setArr arr (ix*2+1) y

addPt :: Arr Word32 Double
      -> Ref Word32
      -> (CExp Double, CExp Double)
      -> Aplite ()
addPt arr ixref (x, y) = do
  ix <- getRef ixref
  setPt arr ix (x, y)
  setRef ixref (ix+1)

dist :: Point -> Point -> CExp Double
dist (x1, y1) (x2, y2) = sqrt_ (((abs $ x2-x1)**2) + ((abs $ y2-y1)**2))

eqPoint :: Point -> Point -> CExp Bool
eqPoint a b = dist a b #< eps
  where eps = 0.000001
