function showFPS() {
    var e = document.getElementById('fps');
    e.textContent = (frames/5) + ' FPS';
    frames = 0;
    window.setTimeout(showFPS, 5000);
}

function module(stdlib, ffi, heap){
    "use asm";
    var pixels = new stdlib.Uint8Array(heap);
    
    function xs32(x) {
        x = x|0;
        x = ((x|0) ^ (((x|0) >> (13|0))|0))|0;
        x = ((x|0) ^ (((x|0) << (17|0))|0))|0;
        x = ((x|0) ^ (((x|0) >> (5|0))|0))|0;
        return x|0;
    }

    function xs32_2(oct, x, y) {
        oct = oct|0;
        x = x|0;
        y = y|0;
        var oh = 0;
        var xh = 0;
        var yh = 0;
        oh = xs32(((oct|0)*887)|0)|0;
        xh = xs32(((x|0)*2251)|0)|0;
        yh = xs32(((y|0)*7919)|0)|0;
        return xs32(((((oh|0)+(xh|0))|0)+(yh|0))|0)|0;
    }

    function grad(octavehash, xi, yi, x, y) {
        octavehash = octavehash|0;
        xi = xi|0;
        yi = yi|0;
        x = +x;
        y = +y;
        switch(((xs32_2(octavehash|0, xi|0, yi|0)|0) % (8|0))|0) {
        case 0:  return +(+x + +y);
        case 1:  return +(-x + +y);
        case 2:  return +(+x - +y);
        case 3:  return +(-x - +y);
        case 4:  return +x;
        case 5:  return -x;
        case 6:  return +y;
        case 7:  return -y;
        }
        return +0;
    }

    function lerp(a, b, t) {
        a = +a;
        b = +b;
        t = +t;
        return +(+a + +(+t * +(+b - +a)));
    }

    function fade(t) {
        t = +t;
        return +t * +t * +t * (+t * (+t * +6 - +15) + +10);
    }
    function perlin(oct, x, y) {
        oct = oct|0;
        x = +x;
        y = +y;
        var x0 = 0;
        var y0 = 0;
        var x1 = 0;
        var y1 = 0;
        var a = 0.0;
        var b = 0.0;
        var c = 0.0;
        var d = 0.0;
        var u = 0.0;
        var v = 0.0;
        x0 = ~~(+x)|0; // TODO: fails for negative coordinates
        y0 = ~~(+y)|0;
        x1 = ((x0|0)+(1|0))|0;
        y1 = ((y0|0)+(1|0))|0;

        // Dot products of distance vectors and their corresponding random
        // vectors
        a = +grad(oct, x0, y0, +x - +(~~x0), +y - +(~~y0));
        b = +grad(oct, x1, y0, +x - +(~~x1), +y - +(~~y0));
        c = +grad(oct, x0, y1, +x - +(~~x0), +y - +(~~y1));
        d = +grad(oct, x1, y1, +x - +(~~x1), +y - +(~~y1));

        // Easing function to get nicer behavior close to integral points
        u = +fade(+x % +1);
        v = +fade(+y % +1);

        // Interpolate dot products, receive bacon
        return +lerp(+lerp(a, b, u), +lerp(c, d, u), v);
    }

    function perlinOct(octaves, persistence, x, y) {
        octaves = octaves|0;
        persistence = +persistence;
        x = +x;
        y = +y;
        var freq = 1.0, amplitude = 1.0, max = 0.0, total = 0.0, oct = 1;
        for(; (oct|0) <= (octaves|0); oct = ((oct|0) + 1)|0) {
            total = +total + +(+perlin(xs32(oct|0)|0,
                                       +(+x * +freq),
                                       +(+y * +freq)) * +amplitude);
            max = +max + +amplitude;
            freq = +freq * +2;
            amplitude = +amplitude * +persistence;
        }
        return +total / +max;
    }

    function clouds(off, lim) {
        off = off|0;
        lim = lim|0;
        var x = 0, y = 0, val = 0.0, px = 0, alpha = 0;
        for(x = 0; (x|0) < (lim|0); x = ((x|0) + 1)|0) {
            for(y = 0; (y|0) < 200; y = ((y|0) + 1)|0) {
                px = (4*(((((y|0)*1024)|0)+(x|0))|0))|0;
                val = +perlinOct(4, 0.5, +(~~(((off|0)+(x|0))|0))/75.0, (+~~y)/75.0);
                if(val < -0.5) {
                    val = -0.5;
                } else if(val > 0.5) {
                    val = 0.5;
                }
                pixels[px|0]             = 255;
                pixels[((px|0)+(1|0))|0] = 255;
                pixels[((px|0)+(2|0))|0] = 255;
                pixels[((px|0)+(3|0))|0] = (~~(128.0 - +(255.0 * +val)))|0;
            }
        }
    }
    
    return {
        perlinOct: perlinOct,
        clouds: clouds
    };
}

var frames = 0;
var keep_going = true;
function stop() {
    keep_going = false;
}

window.onload = function() {
    var e = document.getElementById("can");
    var c = e.getContext("2d");
    var imgdata = c.createImageData(1024, 256);
    var b = imgdata.data.buffer;
    var m = module(window, null, b);
    var stopbtn = document.getElementById('stop');
    var resetbtn = document.getElementById('reset');

    function paint(off, len) {
        m.clouds(off, 200);
        c.putImageData(imgdata, 0, 0);
        ++frames;

        if(keep_going) {
            window.requestAnimationFrame(function() {paint(off+3, len);});
        }
    }

    window.setTimeout(showFPS, 5000);
    window.restart = function() {
        keep_going = true;
        paint(0, 200);
    }
    stopbtn.addEventListener('click', stop);
    resetbtn.addEventListener('click', restart);
    restart();
};
