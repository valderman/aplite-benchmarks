seed = 5;
var size = 100000;
var finalpts;
var width = 250;
var height = 125;
function kMeans(nclusters, points) {
    var clusters = [];
    var clusterpts = [];
    for(var i = 0; i < nclusters; ++i) {
        clusters.push({x:random()*width, y:random()*height});
        clusterpts.push([]);
    }
    var changed = true;
    while(onePass(clusters, clusterpts, points));
    finalpts = clusters;
    return clusterpts;
}

function onePass(clusters, clusterpts, points) {
    var changed = false;
    for(var i = 0; i < clusters.length; ++i) {
        clusterpts[i] = [];
    }
    for(var i = 0; i < points.length; ++i) {
        assignClosest(clusters, clusterpts, points[i].x, points[i].y);
    }
    for(var i = 0; i < clusters.length; ++i) {
        var m = meanPoint(clusterpts[i]);
        if(!eqPoint(m, clusters[i])) {
            changed = true;
            clusters[i] = m;
        }
    }
    finalpts = clusters;
    return changed;
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(Math.abs(x2-x1),2)+Math.pow(Math.abs(y2-y1),2));
}

function assignClosest(clusters, clusterpts, x, y) {
    var d = dist(clusters[0].x, clusters[0].y, x, y);
    var ix = 0;
    for(var i = 1; i < clusters.length; ++i) {
        var d2 = dist(clusters[i].x, clusters[i].y, x, y);
        if(d2 < d) {
            d = d2;
            ix = i;
        }
    }
    clusterpts[ix].push({x:x, y:y});
}

function meanPoint(arr) {
    var sumx = 0, sumy = 0;
    for(var i = 0; i < arr.length; ++i) {
        sumx += arr[i].x;
        sumy += arr[i].y;
    }
    return {x : sumx/arr.length, y : sumy/arr.length};
}

var eps = 0.000001;

function eqPoint(a, b) {
    return Math.abs(a.x - b.x) < eps && Math.abs(a.y - b.y) < eps;
}

function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}














window.onload = function() {
    var pts = [];

    for(var i = 0; i < size; ++i) {
        pts.push({x: random()*width, y: random()*height});
    }
    points = pts;
    var t = new Date().getTime();
    var cs = kMeans(5, pts);
    var t2 = new Date().getTime();
    finalpts.map(function(x) {console.log(x);});
    console.log(t2-t);
/*    
    var ctx = document.getElementById('can').getContext('2d');
    for(var i = 0; i < cs.length; ++i) {
        ctx.fillStyle = colors[i];
        ctx.lineWidth = 0;
        for(var j = 0; j < cs[i].length; ++j) {
            ctx.fillRect(cs[i][j].x*4, cs[i][j].y*4, 4, 4);
        }
    }
    var ctx = document.getElementById('can').getContext('2d');
    ctx.fillStyle = 'black';
    for(var i = 0; i < finalpts.length; ++i) {
        ctx.fillRect(finalpts[i].x*4-4, finalpts[i].y*4-4, 8, 8);
    }
*/
}

function step() {
    var changed = onePass(clusters, clusterpts, points);
    console.log("Changed: " + changed);
    var cs = clusterpts;
    var ctx = document.getElementById('can').getContext('2d');
    ctx.clearRect(0, 0, width*4, height*4);
    for(var i = 0; i < cs.length; ++i) {
        ctx.fillStyle = colors[i];
        ctx.lineWidth = 0;
        for(var j = 0; j < cs[i].length; ++j) {
            ctx.fillRect(cs[i][j].x*4, cs[i][j].y*4, 4, 4);
        }
    }
    var ctx = document.getElementById('can').getContext('2d');
    ctx.fillStyle = 'black';
    clusters.map(function(x) {console.log(x);});
    for(var i = 0; i < nclusters; ++i) {
        ctx.fillRect(finalpts[i].x*4-4, finalpts[i].y*4-4, 8, 8);
    }
}

var colors = ['red', 'blue', 'yellow', 'magenta', 'green'];
var clusters = [];
var clusterpts = [];
var points = [];
var nclusters = 3;
for(var i = 0; i < nclusters; ++i) {
    clusters.push({x:random()*width, y:random()*height});
    clusterpts.push([]);
}
