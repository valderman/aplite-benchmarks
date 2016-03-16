{-# LANGUAGE CPP #-}
import Haste.Aplite
import Haste.Performance

xtea_rounds :: Num a => a
xtea_rounds = 64

xtea_delta :: Num a => a
xtea_delta = 0x9E3779B9

type Key = Buf
type IV  = Buf
type Buf = Arr Index Word32
type Buf' = IOUArray Index Word32
type Key' = Buf'
type IV'  = Buf'
type BlockCipher = Key -> CExp Index -> Buf -> Aplite ()

encrypt' :: Key' -> Index -> Buf' -> IO ()
encrypt' = aplite encrypt

decrypt' :: Key' -> Index -> Buf' -> IO ()
decrypt' = aplite decrypt

encrypt :: BlockCipher
encrypt = enc_dec (+) id 0

decrypt :: BlockCipher
decrypt = enc_dec (subtract) reverse (fromIntegral $ xtea_rounds*xtea_delta)

enc_dec :: (CExp Word32 -> CExp Word32 -> CExp Word32)
        -> ([Aplite ()] -> [Aplite ()])
        -> CExp Index
        -> BlockCipher
enc_dec op rev initsum key off buf = do
  v0 <- initRef =<< getArr buf off
  v1 <- initRef =<< getArr buf (off+1)
  sumref <- initRef initsum
  for (0 :: CExp Index, 1, Excl xtea_rounds) $ \i -> do
    sequence_ $ rev
      [ do x1 <- getRef v1
           sum <- getRef sumref
           k <- getArr key (sum .&. 3)
           modifyRef v0 (op ((((x1 `shiftL` 4) `xor` (x1 `shiftR` 5))+x1) `xor`
                             (sum + k)))
      , modifyRef sumref (op xtea_delta)
      , do x0 <- getRef v0
           sum <- getRef sumref
           k <- getArr key ((sum `shiftR` 11) .&. 3)
           modifyRef v1 (op ((((x0 `shiftL` 4) `xor` (x0 `shiftR` 5))+x0) `xor`
                             (sum + k)))
      ]
  getRef v0 >>= setArr buf off
  getRef v1 >>= setArr buf (off+1)

xorBlock :: IV -> Buf -> CExp Index -> CExp Length -> Aplite ()
xorBlock iv buf off len = for (0, 1, Excl len) $ \i -> do
  getArr iv i >>= modifyArr buf (off+i) . xor

xorb :: IV' -> Buf' -> Index -> Length -> IO ()
xorb = aplite xorBlock

encryptCBC :: BlockCipher -> Length -> IV' -> Key' -> Length -> Buf' -> IO ()
encryptCBC encBlock blocklen = apliteWith TUNING $ \iv key len buf -> do
  for(0, fromIntegral blocklen, Excl len) $ \i -> do
    xorBlock iv buf i $ value blocklen
    encBlock key i buf
    for(0, 1, Excl $ value blocklen) $ \j -> do
      getArr buf (i+j) >>= setArr iv j

decryptCBC :: BlockCipher -> Length -> IV' -> Key' -> Length -> Buf' -> IO ()
decryptCBC decBlock blocklen = apliteWith TUNING $ \iv key len buf -> do
  next_iv <- newArr (value blocklen)
  for(0, fromIntegral blocklen, Excl len) $ \i -> do
    for(0, 1, Excl $ value blocklen) $ \j -> do
      getArr buf (i+j) >>= setArr next_iv j
    decBlock key i buf
    xorBlock iv buf i (value blocklen)
    for(0, 1, Excl $ value blocklen) $ \j -> do
      getArr next_iv j >>= setArr iv j

size = 1000000

main = do
  prep <- newArray (0, 1) 0
  prepiv <- newArray (0, 2) 0
  key <- newListArray (0, 3) [1,3,3,7]
  encryptCBC encrypt 2 prepiv key size prep
--  decryptCBC decrypt iv key 0 2 prep

  iv <- newListArray (0, 2) [19,17]
  buf <- newArray (0, size-1) 0

  t <- now
  encryptCBC encrypt 2 iv key size buf
  t' <- now
  print (t' - t)
  readArray buf (size-1) >>= print
--  iv <- newListArray (0, 3) [19,17]
--  decryptCBC decrypt 2 iv key size buf
--  getElems buf >>= print
