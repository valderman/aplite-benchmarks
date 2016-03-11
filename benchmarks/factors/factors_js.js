// slower reference implementation
function primeFactorization(num){
  var root = Math.sqrt(num),  
  result = arguments[1] || [],  //get unnamed paremeter from recursive calls
  x = 2; 

  if(num % x){//if not divisible by 2 
   x = 3;//assign first odd
   while((num % x) && ((x = x + 2) < root)){}//iterate odds
  }

  //if no factor found then num is prime
  x = (x <= root) ? x : num;
  result.push(x);//push latest prime factor

  //if num isn't prime factor make recursive call
  return (x === num) ? result : primeFactorization(num/x, result) ;
}

function f(num){
    var result = [];
    while(true) {
        var root = Math.sqrt(num);

        if(num % 2){//if not divisible by 2 
            var x = 3;//assign first odd
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
