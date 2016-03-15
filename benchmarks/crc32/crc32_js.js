// JavaScript CRC32 implementation courtesy of SheetJS, used under the Apache license.
// https://github.com/SheetJS/js-crc32

function signed_crc_table() {
    var c = 0, table = new Array(256);

    for(var n =0; n != 256; ++n){
        c = n;
        c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
        c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
        c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
        c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
        c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
        c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
        c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
        c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
        table[n] = c;
    }

    return typeof Int32Array !== 'undefined' ? new Int32Array(table) : table;
}
var table = signed_crc_table();

function crc32_buf_8(buf) {
	for(var crc = -1, i = 0, L=buf.length-7; i < L;) {
		crc = (crc >>> 8) ^ table[(crc^buf[i++])&0xFF];
		crc = (crc >>> 8) ^ table[(crc^buf[i++])&0xFF];
		crc = (crc >>> 8) ^ table[(crc^buf[i++])&0xFF];
		crc = (crc >>> 8) ^ table[(crc^buf[i++])&0xFF];
		crc = (crc >>> 8) ^ table[(crc^buf[i++])&0xFF];
		crc = (crc >>> 8) ^ table[(crc^buf[i++])&0xFF];
		crc = (crc >>> 8) ^ table[(crc^buf[i++])&0xFF];
		crc = (crc >>> 8) ^ table[(crc^buf[i++])&0xFF];
	}
	while(i < L+7) crc = (crc >>> 8) ^ table[(crc^buf[i++])&0xFF];
	return crc ^ -1;
}

window.onload = function() {
    var arr = new Int32Array(new ArrayBuffer(4*100000000));
    var t1 = new Date().getTime();
    var res = crc32_buf_8(arr);
    var t2 = new Date().getTime();
    console.log(res);
    console.log(t2-t1);
}
