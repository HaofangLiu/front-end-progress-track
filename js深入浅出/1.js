let fn = function () {
  return 1;
};

console.log("fn: ", fn.name); //fn:  fn

let fn2 = fn;
console.log("fn2: ", fn2.name); //fn2:  fn

let fn5 = function fn4() {
  // fn4 作用域仅仅在fn4
};

console.log("fn5: ", fn5.name); // fn4

const fnA = (i, j) => {
  console.log(i, j); // 1  2
  return i + j;
};

console.log(fnA(1, 2)); // 3
