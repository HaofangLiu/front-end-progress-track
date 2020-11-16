function curry(func) { // 接受需要执行的函数之前先进行柯里化

  // 已经完成柯里化，可以执行函数
  return function curried(...args) {
    // 当接受的参数长度和需要执行的函数的参数相等或者大于时，执行函数
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      // 否则，合并参数（执行柯里化步骤）
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

// 完全可以自定义来执行不同的任务
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3));
