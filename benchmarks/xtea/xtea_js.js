// CBC mode XTEA encryption - weak but very easy to implement, which is
// kind of a big deal since the deadline for this thing is in less than 6 hours.
//
// Blocks and IVs consist of two 32 bit integers, keys of four 32 bit integers.

var xtea_rounds = 64;
function encrypt(buf, ix, key) {
    var v0 = buf[ix], v1 = buf[ix+1], sum = 0, delta = 0x9E3779B9;
    for(var i = 0; i < xtea_rounds; ++i) {
        v0 += (((v1 << 4) ^ (v1 >> 5)) + v1) ^ (sum + key[sum & 3]);
        sum += delta;
        v1 += (((v0 << 4) ^ (v0 >> 5)) + v0) ^ (sum + key[(sum>>11) & 3]);
    }
    buf[ix] = v0;
    buf[ix+1] = v1;
}

function decrypt(buf, ix, key) {
    var v0 = buf[ix], v1 = buf[ix+1], delta = 0x9E3779B9;
    var sum = delta*xtea_rounds;
    for(var i = 0; i < xtea_rounds; ++i) {
        v1 -= (((v0 << 4) ^ (v0 >> 5)) + v0) ^ (sum + key[(sum>>11) & 3]);
        sum -= delta;
        v0 -= (((v1 << 4) ^ (v1 >> 5)) + v1) ^ (sum + key[sum & 3]);
    }
    buf[ix] = v0;
    buf[ix+1] = v1;
}

function xor(iv, buf, off, len) {
    for(var i = 0; i < len; ++i) {
        buf[off+i] ^= iv[i];
    }
}

function enc_cbc(iv, key, buf, len, blocksize) {
    for(var i = 0; i < len; i += blocksize) {
        xor(iv, buf, i, blocksize);
        encrypt(buf, i, key);
        for(var j = 0; j < blocksize; ++j) {
            iv[j] = buf[i+j];
        }
    }
}

function dec_cbc(iv, key, buf, len, blocksize) {
    var next_iv = [0,0];
    for(var i = 0; i < len; i += blocksize) {
        for(var j = 0; j < blocksize; ++j) {
            next_iv[j] = buf[i+j];
        }
        decrypt(buf, i, key);
        xor(iv, buf, i, blocksize);
        for(var j = 0; j < blocksize; ++j) {
            iv[j] = next_iv[j];
        }
    }
}

var size = 1000000;
var iv = [19,17];
var key = [1,3,3,7];
