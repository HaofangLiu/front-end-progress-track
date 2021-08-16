function curry(func) {
  // 接受需要执行的函数之前先进行柯里化

  // 已经完成柯里化，可以执行函数
  return function curried(...args) {
    // 当接受的参数长度和需要执行的函数的参数相等或者大于时，执行函数
    if (args.length >= func.length) {
      // 疑问： 这里this永远指向是window吧？因为 return function调用的人永远是window
      return func.call(this, ...args); // args作为argument，属于方法的参数，是一个数组，call接受的是去全部参数
    } else {
      // 否则，合并参数（执行柯里化步骤）
      return function (...args2) {
        return curried.apply(this, [...args, ...args2]); // apply第二个参数接受的是数组
      };
    }
  };
}

// 完全可以自定义来执行不同的任务
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum); //返回一个尚未执行的函数，需要传入参数后去进行判断并执行。

console.log(curriedSum(1)(2)(3));

const person = {
  name: "lucas",
  sayHi: (a, b) => {
    console.log(this.name, a + b);
  },
};

let curriedPerson = curry(person.sayHi);
curriedPerson(1)(2);

// TODO: 尚未找到绑定this 的解法。。