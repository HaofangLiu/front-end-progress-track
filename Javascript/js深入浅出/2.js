var global1 = 1;
function fn1(param1) {
  var local1 = "local1";
  var local2 = "local2";
  function fn2(param2) {
    var local2 = "inner local2";
    console.log(local1);  //local1
    console.log(local2);  // inner local2
  }

  function fn3() {
    var local2 = "fn3 local2";
    fn2(local2);
  }

  fn2(2);
  fn3(3)
}

fn1(1)

console.log(fn1.length);