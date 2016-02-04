function xs32(x) {
    x ^= x >> 13;
    x ^= x << 17;
    x ^= x >> 5;
    return x;
}

function xs32_2(oct, x, y) {
    return xs32(xs32(oct*887) + xs32(x*2251) + xs32(y*7919));
}

function grad(octavehash, xi, yi, x, y) {
    switch(xs32_2(octavehash, xi, yi) % 8) {
        case 0:  return  x + y;
        case 1:  return -x + y;
        case 2:  return  x - y;
        case 3:  return -x - y;
        case 4:  return  x;
        case 5:  return -x;
        case 6:  return  y;
        case 7:  return -y;
        default: return 0;
    }
}

function lerp(a, b, t) {
    return a+t*(b-a);
}

function fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
}

function perlinOct(octaves, persistence, x, y) {
    var freq = 1, amplitude = 1, max = 0, total = 0;
    for(var oct = 1; oct <= octaves; ++oct) {
        total += perlin(xs32(oct), x*freq, y*freq)*amplitude;
        max += amplitude;
        freq *= 2;
        amplitude *= persistence;
    }
    return total/max;
}

// note: always returns zero at integral coordinates
function perlin(octavehash, x, y) {
    var x0 = Math.floor(x);
    var y0 = Math.floor(y);
    var x1 = x0+1;
    var y1 = y0+1;

    // Dot products of distance vectors and their corresponding random vectors
    var a = grad(octavehash, x0, y0, x-x0, y-y0);
    var b = grad(octavehash, x1, y0, x-x1, y-y0);
    var c = grad(octavehash, x0, y1, x-x0, y-y1);
    var d = grad(octavehash, x1, y1, x-x1, y-y1);

    // Easing function to get nicer behavior close to integer points
    var u = fade(x%1);
    var v = fade(y%1);

    // Interpolate dot products, receive bacon
    return lerp(lerp(a, b, u), lerp(c, d, u), v);
}

(typeof window != "undefined" ? window : {}).onload = function() {
    var stopbtn = document.getElementById('stop');
    var resetbtn = document.getElementById('reset');
    stopbtn.addEventListener('click', stop);
    resetbtn.addEventListener('click', restart);
    restart();
};

var frames = 0;
var keep_going = true;
function stop() {
    keep_going = false;
}

function restart() {
    keep_going = true;
    paint(0, 200);
}

function paint(off, len) {
    var e = document.getElementById("can");
    var c = e.getContext("2d");
/*    c.clearRect(0, 0, e.width, e.height);
    c.beginPath();
    c.moveTo(0, noise(1, 0, off/50)*50+100);
    for(var x = 1; x <= len; ++x) {
        c.lineTo(x, noise(1, 0, (off+x)/50)*50+100);
    }
    c.stroke();
*/
    var imgdata = c.createImageData(len, 200);
    var pixels = new Uint32Array(imgdata.data.buffer), nbytes = len*200*4;
    var pixelbytes = imgdata.data;
    for(var x = 0; x < len; ++x) {
        for(var y = 0; y < 200; ++y) {
            var px = y*len+x;
            var val = perlinOct(4, 0.5, (off+x)/75, y/75);
            pixels[px]   = 0xffffff;
            pixelbytes[px*4+3] = 128-255*val;
        }
    }
    c.putImageData(imgdata, 0, 0);
    ++frames;

    if(keep_going) {
        window.requestAnimationFrame(function() {paint(off+3, len);});
    }
}

function showFPS() {
    var e = document.getElementById('fps');
    e.textContent = (frames/5) + ' FPS';
    frames = 0;
    window.setTimeout(showFPS, 5000);
}
window.setTimeout(showFPS, 5000);
