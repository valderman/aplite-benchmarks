function mult(m, m1, m2, out) {
    for(var i = 0; i < m; ++i) {
        for(var j = 0; j < m; ++j) {
            var sum = 0;
            for(var k = 0; k < m; ++k) {
                sum = m1[i*m+k]*m2[k*m+j];
            }
            out[i*m+j] = sum;
        }
    }
}

var size = 600;
var m1 = new Float64Array(new ArrayBuffer(size*size*8));
var m2 = new Float64Array(new ArrayBuffer(size*size*8));
var out = new Float64Array(new ArrayBuffer(size*size*8));
for(var i = 0; i < size*size; ++i) {
    m1[i] = m2[i] = out[i] = 0;
}
