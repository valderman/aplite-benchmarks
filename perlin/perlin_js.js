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
//            var val = perlinOct(4, 0.5, (off+x)/75, y/75);
//            var val = f((off+x)/75, y/75);
            var val = f2((off+x)/75, y/75);
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

var f = (function(v0,v1){
  var v2;
  var v3;
  var v4;
  var v5;
  var v6;
  var v7;
  var v8;
  var v9;
  var v10;
  var v11;
  var v12;
  var v13;
  var v14;
  var v15;
  var v16;
  var v17;
  var v18;
  var v19;
  var v20;
  var v21;
  var v22;
  var v23;
  var v24;
  var v25;
  var v26;
  var v27;
  var v28;
  var v29;
  var v30;
  var v31;
  var v32;
  var v33;
  var v34;
  var v35;
  var v36;
  var v37;
  var v38;
  var v39;
  var v40;
  var v41;
  var v42;
  var v43;
  var v44;
  var v45;
  var v46;
  var v47;
  var v48;
  var v49;
  var v50;
  var v51;
  var v52;
  var v53;
  var v54;
  var v55;
  var v56;
  var v57;
  var v58;
  var v59;
  var v60;
  var v61;
  var v62;
  var v63;
  var v64;
  var v65;
  var v66;
  var v67;
  var v68;
  var v69;
  var v70;
  var v71;
  var v72;
  var v73;
  var v74;
  var v75;
  var v76;
  var v77;
  var v78;
  var v79;
  var v80;
  var v81;
  var v82;
  v2 = 1;
  v3 = 1;
  v4 = 0;
  v5 = 0;
  for(v6 = 1;v6 <= 4;++v6){
    v7 = v2;
    v8 = v3;
    v9 = v4;
    v10 = v5;
    v11 = ((v6 ^ (v6 >> 13)) ^ ((v6 ^ (v6 >> 13)) << 17)) ^ (((v6 ^ (v6 >> 13)) ^ ((v6 ^ (v6 >> 13)) << 17)) >> 5);
    v12 = v11;
    v13 = (((((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) >> 5))) ^ (((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) >> 5))) >> 13)) ^ ((((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) >> 5))) ^ (((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) >> 5))) >> 13)) << 17)) ^ (((((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) >> 5))) ^ (((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) >> 5))) >> 13)) ^ ((((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) >> 5))) ^ (((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) >> 5))) >> 13)) << 17)) >> 5)) % 8;
    v14 = v13;
    if(v14 == 0){
      v15 = ((v0 * v7) - (Math.floor(v0 * v7))) + ((v1 * v7) - (Math.floor(v1 * v7)));
    }else{
      if(v14 == 1){
        v16 = ((v1 * v7) - (Math.floor(v1 * v7))) - ((v0 * v7) - (Math.floor(v0 * v7)));
      }else{
        if(v14 == 2){
          v17 = ((v0 * v7) - (Math.floor(v0 * v7))) - ((v1 * v7) - (Math.floor(v1 * v7)));
        }else{
          if(v14 == 3){
            v18 = (-((v0 * v7) - (Math.floor(v0 * v7)))) - ((v1 * v7) - (Math.floor(v1 * v7)));
          }else{
            if(v14 == 4){
              v19 = (v0 * v7) - (Math.floor(v0 * v7));
            }else{
              if(v14 == 5){
                v20 = -((v0 * v7) - (Math.floor(v0 * v7)));
              }else{
                if(v14 == 6){
                  v21 = (v1 * v7) - (Math.floor(v1 * v7));
                }else{
                  v21 = -((v1 * v7) - (Math.floor(v1 * v7)));
                };
                v22 = v21;
                v20 = v22;
              };
              v23 = v20;
              v19 = v23;
            };
            v24 = v19;
            v18 = v24;
          };
          v25 = v18;
          v17 = v25;
        };
        v26 = v17;
        v16 = v26;
      };
      v27 = v16;
      v15 = v27;
    };
    v28 = v15;
    v29 = (((((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) >> 5))) ^ (((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) >> 5))) >> 13)) ^ ((((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) >> 5))) ^ (((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) >> 5))) >> 13)) << 17)) ^ (((((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) >> 5))) ^ (((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) >> 5))) >> 13)) ^ ((((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) >> 5))) ^ (((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) ^ (((Math.imul((~~(Math.floor(v1 * v7))),7919)) ^ ((Math.imul((~~(Math.floor(v1 * v7))),7919)) >> 13)) << 17)) >> 5))) >> 13)) << 17)) >> 5)) % 8;
    v30 = v29;
    if(v30 == 0){
      v31 = ((v0 * v7) - ((Math.floor(v0 * v7)) + 1)) + ((v1 * v7) - (Math.floor(v1 * v7)));
    }else{
      if(v30 == 1){
        v32 = ((v1 * v7) - (Math.floor(v1 * v7))) - ((v0 * v7) - ((Math.floor(v0 * v7)) + 1));
      }else{
        if(v30 == 2){
          v33 = ((v0 * v7) - ((Math.floor(v0 * v7)) + 1)) - ((v1 * v7) - (Math.floor(v1 * v7)));
        }else{
          if(v30 == 3){
            v34 = (-((v0 * v7) - ((Math.floor(v0 * v7)) + 1))) - ((v1 * v7) - (Math.floor(v1 * v7)));
          }else{
            if(v30 == 4){
              v35 = (v0 * v7) - ((Math.floor(v0 * v7)) + 1);
            }else{
              if(v30 == 5){
                v36 = -((v0 * v7) - ((Math.floor(v0 * v7)) + 1));
              }else{
                if(v30 == 6){
                  v37 = (v1 * v7) - (Math.floor(v1 * v7));
                }else{
                  v37 = -((v1 * v7) - (Math.floor(v1 * v7)));
                };
                v38 = v37;
                v36 = v38;
              };
              v39 = v36;
              v35 = v39;
            };
            v40 = v35;
            v34 = v40;
          };
          v41 = v34;
          v33 = v41;
        };
        v42 = v33;
        v32 = v42;
      };
      v43 = v32;
      v31 = v43;
    };
    v44 = v31;
    v45 = (((((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) >> 5))) ^ (((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) >> 5))) >> 13)) ^ ((((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) >> 5))) ^ (((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) >> 5))) >> 13)) << 17)) ^ (((((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) >> 5))) ^ (((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) >> 5))) >> 13)) ^ ((((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) >> 5))) ^ (((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) ^ (((Math.imul((~~(Math.floor(v0 * v7))),2251)) ^ ((Math.imul((~~(Math.floor(v0 * v7))),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) >> 5))) >> 13)) << 17)) >> 5)) % 8;
    v46 = v45;
    if(v46 == 0){
      v47 = ((v0 * v7) - (Math.floor(v0 * v7))) + ((v1 * v7) - ((Math.floor(v1 * v7)) + 1));
    }else{
      if(v46 == 1){
        v48 = ((v1 * v7) - ((Math.floor(v1 * v7)) + 1)) - ((v0 * v7) - (Math.floor(v0 * v7)));
      }else{
        if(v46 == 2){
          v49 = ((v0 * v7) - (Math.floor(v0 * v7))) - ((v1 * v7) - ((Math.floor(v1 * v7)) + 1));
        }else{
          if(v46 == 3){
            v50 = (-((v0 * v7) - (Math.floor(v0 * v7)))) - ((v1 * v7) - ((Math.floor(v1 * v7)) + 1));
          }else{
            if(v46 == 4){
              v51 = (v0 * v7) - (Math.floor(v0 * v7));
            }else{
              if(v46 == 5){
                v52 = -((v0 * v7) - (Math.floor(v0 * v7)));
              }else{
                if(v46 == 6){
                  v53 = (v1 * v7) - ((Math.floor(v1 * v7)) + 1);
                }else{
                  v53 = -((v1 * v7) - ((Math.floor(v1 * v7)) + 1));
                };
                v54 = v53;
                v52 = v54;
              };
              v55 = v52;
              v51 = v55;
            };
            v56 = v51;
            v50 = v56;
          };
          v57 = v50;
          v49 = v57;
        };
        v58 = v49;
        v48 = v58;
      };
      v59 = v48;
      v47 = v59;
    };
    v60 = v47;
    v61 = (((((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) >> 5))) ^ (((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) >> 5))) >> 13)) ^ ((((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) >> 5))) ^ (((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) >> 5))) >> 13)) << 17)) ^ (((((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) >> 5))) ^ (((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) >> 5))) >> 13)) ^ ((((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) >> 5))) ^ (((((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) ^ ((((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) ^ (((Math.imul(v12,887)) ^ ((Math.imul(v12,887)) >> 13)) << 17)) >> 5)) + ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) ^ (((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) ^ ((Math.imul((~~((Math.floor(v0 * v7)) + 1)),2251)) >> 13)) << 17)) >> 5))) + ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) ^ ((((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) ^ (((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) ^ ((Math.imul((~~((Math.floor(v1 * v7)) + 1)),7919)) >> 13)) << 17)) >> 5))) >> 13)) << 17)) >> 5)) % 8;
    v62 = v61;
    if(v62 == 0){
      v63 = ((v0 * v7) - ((Math.floor(v0 * v7)) + 1)) + ((v1 * v7) - ((Math.floor(v1 * v7)) + 1));
    }else{
      if(v62 == 1){
        v64 = ((v1 * v7) - ((Math.floor(v1 * v7)) + 1)) - ((v0 * v7) - ((Math.floor(v0 * v7)) + 1));
      }else{
        if(v62 == 2){
          v65 = ((v0 * v7) - ((Math.floor(v0 * v7)) + 1)) - ((v1 * v7) - ((Math.floor(v1 * v7)) + 1));
        }else{
          if(v62 == 3){
            v66 = (-((v0 * v7) - ((Math.floor(v0 * v7)) + 1))) - ((v1 * v7) - ((Math.floor(v1 * v7)) + 1));
          }else{
            if(v62 == 4){
              v67 = (v0 * v7) - ((Math.floor(v0 * v7)) + 1);
            }else{
              if(v62 == 5){
                v68 = -((v0 * v7) - ((Math.floor(v0 * v7)) + 1));
              }else{
                if(v62 == 6){
                  v69 = (v1 * v7) - ((Math.floor(v1 * v7)) + 1);
                }else{
                  v69 = -((v1 * v7) - ((Math.floor(v1 * v7)) + 1));
                };
                v70 = v69;
                v68 = v70;
              };
              v71 = v68;
              v67 = v71;
            };
            v72 = v67;
            v66 = v72;
          };
          v73 = v66;
          v65 = v73;
        };
        v74 = v65;
        v64 = v74;
      };
      v75 = v64;
      v63 = v75;
    };
    v76 = v63;
    v77 = ((((v0 * v7) - (Math.floor(v0 * v7))) * ((v0 * v7) - (Math.floor(v0 * v7)))) * ((v0 * v7) - (Math.floor(v0 * v7)))) * ((((v0 * v7) - (Math.floor(v0 * v7))) * ((((v0 * v7) - (Math.floor(v0 * v7))) * 6) - 15)) + 10);
    v78 = v77;
    v79 = ((((v1 * v7) - (Math.floor(v1 * v7))) * ((v1 * v7) - (Math.floor(v1 * v7)))) * ((v1 * v7) - (Math.floor(v1 * v7)))) * ((((v1 * v7) - (Math.floor(v1 * v7))) * ((((v1 * v7) - (Math.floor(v1 * v7))) * 6) - 15)) + 10);
    v80 = v79;
    v2 = v7 * 2;
    v3 = v8 * 0.5;
    v4 = v9 + (((v28 + (v78 * (v44 - v28))) + (v80 * ((v60 + (v78 * (v76 - v60))) - (v28 + (v78 * (v44 - v28)))))) * v8);
    v5 = v10 + v8;
  };
  v81 = v4;
  v82 = v5;
  return v81 / v82;
});


var f2 = (function(stdlib, ffi, heap){
"use asm";
var floor = stdlib.Math.floor;
var ceil = stdlib.Math.ceil;
var sqrt = stdlib.Math.sqrt;
var imul = stdlib.Math.imul;
var pow = stdlib.Math.pow;
var cos = stdlib.Math.cos;
var sin = stdlib.Math.sin;
var tan = stdlib.Math.tan;
return ({f:(
(function(v0,v1){
  v0 = +v0;
  v1 = +v1;
  var v2 = 0.0;
  var v3 = 0.0;
  var v4 = 0.0;
  var v5 = 0.0;
  var v6 = 0;
  var v7 = 0.0;
  var v8 = 0.0;
  var v9 = 0.0;
  var v10 = 0.0;
  var v11 = 0;
  var v12 = 0;
  var v13 = 0;
  var v14 = 0;
  var v15 = 0.0;
  var v16 = 0.0;
  var v17 = 0.0;
  var v18 = 0.0;
  var v19 = 0.0;
  var v20 = 0.0;
  var v21 = 0.0;
  var v22 = 0.0;
  var v23 = 0.0;
  var v24 = 0.0;
  var v25 = 0.0;
  var v26 = 0.0;
  var v27 = 0.0;
  var v28 = 0.0;
  var v29 = 0;
  var v30 = 0;
  var v31 = 0.0;
  var v32 = 0.0;
  var v33 = 0.0;
  var v34 = 0.0;
  var v35 = 0.0;
  var v36 = 0.0;
  var v37 = 0.0;
  var v38 = 0.0;
  var v39 = 0.0;
  var v40 = 0.0;
  var v41 = 0.0;
  var v42 = 0.0;
  var v43 = 0.0;
  var v44 = 0.0;
  var v45 = 0;
  var v46 = 0;
  var v47 = 0.0;
  var v48 = 0.0;
  var v49 = 0.0;
  var v50 = 0.0;
  var v51 = 0.0;
  var v52 = 0.0;
  var v53 = 0.0;
  var v54 = 0.0;
  var v55 = 0.0;
  var v56 = 0.0;
  var v57 = 0.0;
  var v58 = 0.0;
  var v59 = 0.0;
  var v60 = 0.0;
  var v61 = 0;
  var v62 = 0;
  var v63 = 0.0;
  var v64 = 0.0;
  var v65 = 0.0;
  var v66 = 0.0;
  var v67 = 0.0;
  var v68 = 0.0;
  var v69 = 0.0;
  var v70 = 0.0;
  var v71 = 0.0;
  var v72 = 0.0;
  var v73 = 0.0;
  var v74 = 0.0;
  var v75 = 0.0;
  var v76 = 0.0;
  var v77 = 0.0;
  var v78 = 0.0;
  var v79 = 0.0;
  var v80 = 0.0;
  var v81 = 0.0;
  var v82 = 0.0;
  v2 = +1;
  v3 = +1;
  v4 = +0;
  v5 = +0;
  for(v6 = 1|0;((v6|0) <= (4|0))|0;v6 = (v6+1)|0){
    v7 = +v2;
    v8 = +v3;
    v9 = +v4;
    v10 = +v5;
    v11 = ((((((v6|0) ^ (((v6|0) >> (13|0))|0))|0) ^ (((((v6|0) ^ (((v6|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ (((((((v6|0) ^ (((v6|0) >> (13|0))|0))|0) ^ (((((v6|0) ^ (((v6|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0;
    v12 = v11|0;
    v13 = (((((((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) ^ ((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) >> (13|0))|0))|0) ^ ((((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) ^ ((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) ^ ((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) >> (13|0))|0))|0) ^ ((((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) ^ ((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) % (8|0))|0;
    v14 = v13|0;
    if(((v14|0) == (0|0))|0){
      v15 = +((+((+((+v0) * (+v7))) - (+(floor((+v0) * (+v7)))))) + (+((+((+v1) * (+v7))) - (+(floor((+v1) * (+v7)))))));
    }else{
      if(((v14|0) == (1|0))|0){
        v16 = +((+((+((+v1) * (+v7))) - (+(floor((+v1) * (+v7)))))) - (+((+((+v0) * (+v7))) - (+(floor((+v0) * (+v7)))))));
      }else{
        if(((v14|0) == (2|0))|0){
          v17 = +((+((+((+v0) * (+v7))) - (+(floor((+v0) * (+v7)))))) - (+((+((+v1) * (+v7))) - (+(floor((+v1) * (+v7)))))));
        }else{
          if(((v14|0) == (3|0))|0){
            v18 = +((+(-(+((+((+v0) * (+v7))) - (+(floor((+v0) * (+v7)))))))) - (+((+((+v1) * (+v7))) - (+(floor((+v1) * (+v7)))))));
          }else{
            if(((v14|0) == (4|0))|0){
              v19 = +((+((+v0) * (+v7))) - (+(floor((+v0) * (+v7)))));
            }else{
              if(((v14|0) == (5|0))|0){
                v20 = +(-(+((+((+v0) * (+v7))) - (+(floor((+v0) * (+v7)))))));
              }else{
                if(((v14|0) == (6|0))|0){
                  v21 = +((+((+v1) * (+v7))) - (+(floor((+v1) * (+v7)))));
                }else{
                  v21 = +(-(+((+((+v1) * (+v7))) - (+(floor((+v1) * (+v7)))))));
                };
                v22 = +v21;
                v20 = +v22;
              };
              v23 = +v20;
              v19 = +v23;
            };
            v24 = +v19;
            v18 = +v24;
          };
          v25 = +v18;
          v17 = +v25;
        };
        v26 = +v17;
        v16 = +v26;
      };
      v27 = +v16;
      v15 = +v27;
    };
    v28 = +v15;
    v29 = (((((((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) ^ ((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) >> (13|0))|0))|0) ^ ((((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) ^ ((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) ^ ((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) >> (13|0))|0))|0) ^ ((((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) ^ ((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v1) * (+v7)))),7919))|0) ^ ((((imul((~~(floor((+v1) * (+v7)))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) % (8|0))|0;
    v30 = v29|0;
    if(((v30|0) == (0|0))|0){
      v31 = +((+((+((+v0) * (+v7))) - (+((+(floor((+v0) * (+v7)))) + (+1))))) + (+((+((+v1) * (+v7))) - (+(floor((+v1) * (+v7)))))));
    }else{
      if(((v30|0) == (1|0))|0){
        v32 = +((+((+((+v1) * (+v7))) - (+(floor((+v1) * (+v7)))))) - (+((+((+v0) * (+v7))) - (+((+(floor((+v0) * (+v7)))) + (+1))))));
      }else{
        if(((v30|0) == (2|0))|0){
          v33 = +((+((+((+v0) * (+v7))) - (+((+(floor((+v0) * (+v7)))) + (+1))))) - (+((+((+v1) * (+v7))) - (+(floor((+v1) * (+v7)))))));
        }else{
          if(((v30|0) == (3|0))|0){
            v34 = +((+(-(+((+((+v0) * (+v7))) - (+((+(floor((+v0) * (+v7)))) + (+1))))))) - (+((+((+v1) * (+v7))) - (+(floor((+v1) * (+v7)))))));
          }else{
            if(((v30|0) == (4|0))|0){
              v35 = +((+((+v0) * (+v7))) - (+((+(floor((+v0) * (+v7)))) + (+1))));
            }else{
              if(((v30|0) == (5|0))|0){
                v36 = +(-(+((+((+v0) * (+v7))) - (+((+(floor((+v0) * (+v7)))) + (+1))))));
              }else{
                if(((v30|0) == (6|0))|0){
                  v37 = +((+((+v1) * (+v7))) - (+(floor((+v1) * (+v7)))));
                }else{
                  v37 = +(-(+((+((+v1) * (+v7))) - (+(floor((+v1) * (+v7)))))));
                };
                v38 = +v37;
                v36 = +v38;
              };
              v39 = +v36;
              v35 = +v39;
            };
            v40 = +v35;
            v34 = +v40;
          };
          v41 = +v34;
          v33 = +v41;
        };
        v42 = +v33;
        v32 = +v42;
      };
      v43 = +v32;
      v31 = +v43;
    };
    v44 = +v31;
    v45 = (((((((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) ^ ((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) >> (13|0))|0))|0) ^ ((((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) ^ ((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) ^ ((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) >> (13|0))|0))|0) ^ ((((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) ^ ((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~(floor((+v0) * (+v7)))),2251))|0) ^ ((((imul((~~(floor((+v0) * (+v7)))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) % (8|0))|0;
    v46 = v45|0;
    if(((v46|0) == (0|0))|0){
      v47 = +((+((+((+v0) * (+v7))) - (+(floor((+v0) * (+v7)))))) + (+((+((+v1) * (+v7))) - (+((+(floor((+v1) * (+v7)))) + (+1))))));
    }else{
      if(((v46|0) == (1|0))|0){
        v48 = +((+((+((+v1) * (+v7))) - (+((+(floor((+v1) * (+v7)))) + (+1))))) - (+((+((+v0) * (+v7))) - (+(floor((+v0) * (+v7)))))));
      }else{
        if(((v46|0) == (2|0))|0){
          v49 = +((+((+((+v0) * (+v7))) - (+(floor((+v0) * (+v7)))))) - (+((+((+v1) * (+v7))) - (+((+(floor((+v1) * (+v7)))) + (+1))))));
        }else{
          if(((v46|0) == (3|0))|0){
            v50 = +((+(-(+((+((+v0) * (+v7))) - (+(floor((+v0) * (+v7)))))))) - (+((+((+v1) * (+v7))) - (+((+(floor((+v1) * (+v7)))) + (+1))))));
          }else{
            if(((v46|0) == (4|0))|0){
              v51 = +((+((+v0) * (+v7))) - (+(floor((+v0) * (+v7)))));
            }else{
              if(((v46|0) == (5|0))|0){
                v52 = +(-(+((+((+v0) * (+v7))) - (+(floor((+v0) * (+v7)))))));
              }else{
                if(((v46|0) == (6|0))|0){
                  v53 = +((+((+v1) * (+v7))) - (+((+(floor((+v1) * (+v7)))) + (+1))));
                }else{
                  v53 = +(-(+((+((+v1) * (+v7))) - (+((+(floor((+v1) * (+v7)))) + (+1))))));
                };
                v54 = +v53;
                v52 = +v54;
              };
              v55 = +v52;
              v51 = +v55;
            };
            v56 = +v51;
            v50 = +v56;
          };
          v57 = +v50;
          v49 = +v57;
        };
        v58 = +v49;
        v48 = +v58;
      };
      v59 = +v48;
      v47 = +v59;
    };
    v60 = +v47;
    v61 = (((((((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) ^ ((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) >> (13|0))|0))|0) ^ ((((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) ^ ((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) ^ ((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) >> (13|0))|0))|0) ^ ((((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) ^ ((((((((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) ^ ((((((imul(v12,887))|0) ^ ((((imul(v12,887))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) + ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) ^ ((((imul((~~((+(floor((+v0) * (+v7)))) + (+1))),2251))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) + ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) ^ ((((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) ^ ((((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) ^ ((((imul((~~((+(floor((+v1) * (+v7)))) + (+1))),7919))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0))|0) >> (13|0))|0))|0) << (17|0))|0))|0) >> (5|0))|0))|0) % (8|0))|0;
    v62 = v61|0;
    if(((v62|0) == (0|0))|0){
      v63 = +((+((+((+v0) * (+v7))) - (+((+(floor((+v0) * (+v7)))) + (+1))))) + (+((+((+v1) * (+v7))) - (+((+(floor((+v1) * (+v7)))) + (+1))))));
    }else{
      if(((v62|0) == (1|0))|0){
        v64 = +((+((+((+v1) * (+v7))) - (+((+(floor((+v1) * (+v7)))) + (+1))))) - (+((+((+v0) * (+v7))) - (+((+(floor((+v0) * (+v7)))) + (+1))))));
      }else{
        if(((v62|0) == (2|0))|0){
          v65 = +((+((+((+v0) * (+v7))) - (+((+(floor((+v0) * (+v7)))) + (+1))))) - (+((+((+v1) * (+v7))) - (+((+(floor((+v1) * (+v7)))) + (+1))))));
        }else{
          if(((v62|0) == (3|0))|0){
            v66 = +((+(-(+((+((+v0) * (+v7))) - (+((+(floor((+v0) * (+v7)))) + (+1))))))) - (+((+((+v1) * (+v7))) - (+((+(floor((+v1) * (+v7)))) + (+1))))));
          }else{
            if(((v62|0) == (4|0))|0){
              v67 = +((+((+v0) * (+v7))) - (+((+(floor((+v0) * (+v7)))) + (+1))));
            }else{
              if(((v62|0) == (5|0))|0){
                v68 = +(-(+((+((+v0) * (+v7))) - (+((+(floor((+v0) * (+v7)))) + (+1))))));
              }else{
                if(((v62|0) == (6|0))|0){
                  v69 = +((+((+v1) * (+v7))) - (+((+(floor((+v1) * (+v7)))) + (+1))));
                }else{
                  v69 = +(-(+((+((+v1) * (+v7))) - (+((+(floor((+v1) * (+v7)))) + (+1))))));
                };
                v70 = +v69;
                v68 = +v70;
              };
              v71 = +v68;
              v67 = +v71;
            };
            v72 = +v67;
            v66 = +v72;
          };
          v73 = +v66;
          v65 = +v73;
        };
        v74 = +v65;
        v64 = +v74;
      };
      v75 = +v64;
      v63 = +v75;
    };
    v76 = +v63;
    v77 = +((+((+((+((+((+v0) * (+v7))) - (+(floor((+v0) * (+v7)))))) * (+((+((+v0) * (+v7))) - (+(floor((+v0) * (+v7)))))))) * (+((+((+v0) * (+v7))) - (+(floor((+v0) * (+v7)))))))) * (+((+((+((+((+v0) * (+v7))) - (+(floor((+v0) * (+v7)))))) * (+((+((+((+((+v0) * (+v7))) - (+(floor((+v0) * (+v7)))))) * (+6))) - (+15))))) + (+10))));
    v78 = +v77;
    v79 = +((+((+((+((+((+v1) * (+v7))) - (+(floor((+v1) * (+v7)))))) * (+((+((+v1) * (+v7))) - (+(floor((+v1) * (+v7)))))))) * (+((+((+v1) * (+v7))) - (+(floor((+v1) * (+v7)))))))) * (+((+((+((+((+v1) * (+v7))) - (+(floor((+v1) * (+v7)))))) * (+((+((+((+((+v1) * (+v7))) - (+(floor((+v1) * (+v7)))))) * (+6))) - (+15))))) + (+10))));
    v80 = +v79;
    v2 = +((+v7) * (+2));
    v3 = +((+v8) * (+0.5));
    v4 = +((+v9) + (+((+((+((+v28) + (+((+v78) * (+((+v44) - (+v28))))))) + (+((+v80) * (+((+((+v60) + (+((+v78) * (+((+v76) - (+v60))))))) - (+((+v28) + (+((+v78) * (+((+v44) - (+v28))))))))))))) * (+v8))));
    v5 = +((+v10) + (+v8));
  };
  v81 = +v4;
  v82 = +v5;
  return +((+v81) / (+v82));
})
)});
})(window, null, new ArrayBuffer(4096)).f;
