function sort(arr) {
    var len = arr.length;
    for(var j = 0; j < len-1; ++j) {
        var minIx = j;
        for(var i = j+1; i < len; ++i) {
            if(arr[i] < arr[minIx]) {
                minIx = i;
            }
        }
        if(minIx != j) {
            swap(arr, minIx, j);
        }
    }
}

function swap(arr, i, j) {
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

var size = 50000;
