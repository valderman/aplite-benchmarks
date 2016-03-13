{-# LANGUAGE CPP, BangPatterns #-}
import Haste.Aplite
import Haste.Performance
import Numeric

tuning = TUNING

type Index = CExp Word32
type Length = Index
type Array = Arr Index
type CRCTable = IOUArray Int32 Int32

signed_crc_table :: CRCTable -> IO ()
signed_crc_table = aplite tuning signed_crc_table'

signed_crc_table' :: Arr Int32 Int32 -> Aplite ()
signed_crc_table' tbl = do
  for (0, 1, Excl 256) $ \i -> do
    c <- foldr (.) id (replicate 8 step) (pure i)
    setArr tbl i c
  where
    step :: Aplite (CExp Int32) -> Aplite (CExp Int32)
    step mc = mc >>= \c -> share =<< do
      ifE (c .&. 1 #== 1)
        (pure $ fromIntegral (-306674912) `xor` (c `shiftRL` 1))
        (pure $ c `shiftRL` 1)

crc32 :: CRCTable -> Int32 -> IOUArray Int32 Int32 -> IO Int32
crc32 = aplite tuning $ \tbl len buf -> do
  crc <- initRef (fromIntegral (-1))
  for (0, 1, Excl len) $ \i -> do
    getRef crc >>= step tbl buf i >>= setRef crc
  xor 0xFFFFFFFF <$> getRef crc
  where
    step :: Arr Int32 Int32
         -> Arr Int32 Int32
         -> CExp Int32
         -> CExp Int32
         -> Aplite (CExp Int32)
    step tbl buf i crc = do
      x <- getArr buf i
      x' <- getArr tbl ((crc `xor` x) .&. 0xFF)
      return $ (crc `shiftRL` 8) `xor` x'

shiftRL' :: Int32 -> Int -> Int32
shiftRL' a b = fromIntegral ((fromIntegral a :: Word32) `shiftR` b) :: Int32

-- standard Haskell version
mktable :: IO CRCTable
mktable = do
  tbl <- newArray_ (0, 255)
  forM_ [0..255] $ \i -> do
    c <- foldr (.) id (replicate 8 step) (pure i)
    writeArray tbl i c
  return tbl
  where
    step :: IO Int32 -> IO Int32
    step mc = mc >>= \c -> do
      if c .&. 1 == 1
        then pure $ fromIntegral (-306674912) `xor` (c `shiftRL'` 1)
        else pure $ c `shiftRL'` 1

crc32hs :: CRCTable -> Int32 -> IOUArray Int32 Int32 -> IO Int32
crc32hs tbl len buf = go (-1) 0
  where
    go !crc !i
      | i < len   = do
          crc' <- step crc i
          go crc' (i+1)
      | otherwise = return (crc `xor` 0xFFFFFFFF)
    
    step :: Int32 -> Int32 -> IO Int32
    step crc i = do
      x <- readArray buf i
      x' <- readArray tbl ((crc `xor` x) .&. 0xFF)
      return $ (crc `shiftRL'` 8) `xor` x'

testlen = 100000000

main = do
  tbl <- newArray_ (0,255)
  buf <- newArray_ (0, testlen-1)
  signed_crc_table tbl
  x <- crc32 tbl testlen buf
  t <- now
  x <- crc32 tbl testlen buf
  t' <- now
  print x
  print (t'-t)

{-
-- standard Haskell main
main = do
  tbl <- mktable
  buf <- newArray_ (0, testlen-1)
  x <- crc32hs tbl testlen buf
  print x
-}
