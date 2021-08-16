// 在函数执行时，this 关键字并不会指向正在运行的函数本身，而是指向调用该函数的对象。
function f() {
  console.log(this);
  console.log(arguments);
}

const name = "词法作用域-lucas";
this.name = "window-name"; // (node中模拟window的环境)

// console.log(window);(node调试下为undefined)

// 箭头函数拥有词法作用域的this值（即不会新产生自己作用域下的this, arguments, super 和 new.target 等对象）

//箭头函数里没有 this 的概念，
// 如果出现了 this ，
// 看包含箭头函数的“那个容器”所在的作用域是谁，
// this 就是谁
const person = {
  name: "lucas",
  sayHi: () => {
    console.log(this);
    console.log(this.name + " hi");
  },
  asyBye: () => {
    console.log(name + " bye");
  },
};

person.sayHi();

person.asyBye();

// 首先call/ apply/bind都是改变this的指向函数，
// call 后的第一个参数为(this),就是this指向的对象，然后接所有的参数，
// apply同样，只不过所有的参数必须是以数组的形式来传进来

function f() {
  console.log(this);
  console.log(arguments);
}

// 当调用f时， f()为f.call()的简写
// 函数默认接受的this为window Window object为this， arguement为空数组。

const person2 = {
  name: "lucas-function",
  sayHi: function () {
    console.log(this.name + " hi");
  },
  //   sayHi: function (person) {
  //     console.log(person.name + "hi");
  //   },
  asyBye: function () {
    console.log(this.name + " bye");
  },
};

// 当看到这种函数的时候，首先要了解，this并不是声明函数的时候定义，而是在调用的时候决定的。

// person2.sayHi() === person2.sayHi.call(person2);
// 也就演变了现在的简写和this，这就是由来

console.log("----------------------------------------------------------------");


