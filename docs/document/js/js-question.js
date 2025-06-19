// const object = { 1: "a", 2: "b", 3: "c" };
// const set = new Set([1, 2, 3]);

// object.hasOwnProperty(1); // true
// object.hasOwnProperty("1"); // true

// set.has(1); // true
// set.has("1"); // false

// function Person(firstName, lastName) {
//   this.firstName = firstName;
//   this.lastName = lastName;
// }

// const member = new Person("11", "dd");

// Person.getFullName = function () {
//   return `${this.firstName} ${this.lastName}`;
// };

// // console.log(member.getFullName()); // TypeError: member.getFullName is not a function

// !!null; // false
// !!""; // false
// !!1; // true
// !!NaN; // false

// //等号== or ===比较对象时，引用类型比较的是地址
// function checkAge(data) {
//   if (data === { age: 18 }) {
//     console.log("equal");
//   } else if (data == { age: 18 }) {
//     console.log("equal11");
//   } else {
//     console.log("not equal");
//   }
// }

// checkAge({ age: 18 }); // not equal

// (() => {
//   let x, y;
//   try {
//     throw new Error("error");
//   } catch (x) {
//     (x = 1), (y = 2);
//     console.log(x);
//   }
//   console.log(x, y); // undefined undefined
// })();

// async function async1() {
//   console.log("async1 start");
//   await async2();
//   console.log("async1 end");
// }
// async function async2() {
//   console.log("async2");
// }
// console.log("script start");
// setTimeout(function () {
//   console.log("setTimeout");
// });
// async1();
// new Promise(function (resolve) {
//   console.log("promise1");
//   resolve();
// }).then(function () {
//   console.log("promise2");
// });
// setImmediate(function () {
//   console.log("setImmediate");
// });
// process.nextTick(() => {
//   console.log("nextTick");
// });
// console.log("script end");
// // Output:
// // script start
// // async1 start
// // async2
// // promise1
// // script end
// // nextTick
// // async1 end
// // promise2
// // setTimeout
// // setImmediate

// Promise.resolve("A")
//   .then((res) => {
//     console.log("promise1", res); // A
//   })
//   .finally(() => {
//     console.log("finally1");
//   });

// Promise.resolve("B")
//   .finally(() => {
//     console.log("finally2");
//   })
//   .then((res) => {
//     console.log("promise2", res); // B
//   });
// // promise1 A
// // finally2
// // finally1
// // promise2 B//output:

// for (var i = 0; i < 5; i++) {
//   setTimeout(() => {
//     console.log(i); // 5, 5, 5, 5, 5
//   }, 0);
// }

// //这段代码和 setTimeout 没有关系，console.log(i) 在循环时就已经执行了，所以输出 0, 1, 2, 3, 4。
// for (var i = 0; i < 5; i++) {
//   setTimeout(console.log(i), 0);
// }

// for (let i = 0; i < 5; i++) {
//   setTimeout(() => {
//     console.log(i); // 0，1，2，3，4
//   }, 0);
// }

// new Promise((resolve, reject) => {
//   console.log("promise1");
//   resolve("");
// })
//   .then(() => {
//     console.log("then 11");
//     new Promise((resolve, reject) => {
//       console.log("promise2");
//       resolve();
//     })
//       .then(() => {
//         console.log("then 21");
//       })
//       .then(() => {
//         console.log("then 22");
//       });
//   })
//   .then(() => {
//     console.log("then 12");
//   });
// // Output:
// // promise1
// // then 11
// // promise2
// // then 21
// // then 22
// // then 12

// console.log(uniq); //reference error: uniq is not defined
// let ubiq;
// console.log(ubiq); // undefined
// ubiq = {};
// console.log(ubiq); // {}

// Promise.resolve()
//   .then(() => {
//     console.log(0);
//     return Promise.resolve(4);
//   })
//   .then((res) => {
//     console.log(res);
//   });

// Promise.resolve()
//   .then(() => {
//     console.log(1);
//   })
//   .then(() => {
//     console.log(2);
//   })
//   .then(() => {
//     console.log(3);
//   })
//   .then(() => {
//     console.log(5);
//   });

//output:
// 0
// 1
// 2
// 3
// 4
// 5

async function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

class SuperTask {
  constructor({ poolSize }) {
    this.waiting = [];
    this.poolSize = poolSize || 2;
    this.runningCount = 0;
  }
  setPoolSize(size) {
    this.poolSize = size;
    this.runTask();
  }

  add(fn){
    return new Promise(resolve => {
        this.waiting.push({fn,resolve})
        this.runTask()
    })
  }

  runTask(){
    console.log(this.runningCount)
    console.log(this.waiting)

    while(this.runningCount < this.poolSize && this.waiting.length > 0){
        const {fn, resolve} = this.waiting.shift();
        this.runningCount++;
        fn().then(() => {
            resolve();
            this.runningCount--;
            // this.runTask();
        })
    }
  }
}

const superTask = new SuperTask({ poolSize: 10 });

function addTask(time, name) {
  const label = `Task ${name} finished`;
  console.time(label);
  superTask
    .add(() => timeout(time))
    .then(() => {
      console.timeEnd(label);
    });
}

addTask(5000,1)
addTask(3000,2)
addTask(1000,3)
