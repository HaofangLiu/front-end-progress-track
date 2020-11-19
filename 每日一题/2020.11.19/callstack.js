let name = "pr";

// firstFunction()

const firstFunction = () => {
  console.log("first function");
  secondFunction();
  console.log("first function again");
};

const secondFunction = () => {
  console.log("second function");
};

firstFunction();

console.log(name);

//代码在浏览器加载时，引擎创建一个全局执行上下文，入栈；
// firstFunction 函数调用时（此时函数内部代码还未执行），引擎创建一个新的函数执行上下文，然后入栈；
// 接着 secondFunction 函数调用时（此时函数内部代码还未执行），引擎创建一个新的函数执行上下文，然后入栈；
// secondFunction 函数执行完后，函数执行上下文出栈（销毁）；
// 接着 firstFunction 函数执行完后，函数执行上下文出栈（销毁）；
// 最后全部代码执行完后，全局执行上下文出栈（浏览器关闭时）；
