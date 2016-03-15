function f(num){
    var result = [];
    while(true) {
        var root = Math.sqrt(num);

        if(num % 2){
            var x = 3;
            while(true) {
                if(!(num % x)) {
                    break;
                }
                x = x + 2;
                if(x >= root) {
                    break;
                }
            }
        }

        if(x > root) {
            x = num;
        }
        result.push(x);

        if(num === x) {
            return result;
        }
        num = (num / x);
    }
}

window.onload = function() {
    var t1 = new Date().getTime();
    var res = f(big);
    var t2 = new Date().getTime();
    console.log(res);
    console.log(t2-t1);
}

var big = 5467154436746477;
