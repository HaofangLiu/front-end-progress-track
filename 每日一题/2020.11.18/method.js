// fn(10);

// const fn = (a) => {
//   console.log(a);
// };

// 箭头函数不支持，严格遵守先声明后调用

//----------------------------------------------------------------------------

fnTest(10);

function fnTest(a) {
  console.log("a: ", a);
}

// 当利用function或者var进行函数/变量声明时，在JavaScript中会被提升到作用域的顶部


//----------------------------------------------------------------------------


console.log('varFunc: ', varFunc);
varFunc();

var varFunc = function(){
    console.log(123);
}

// 当利用var时，变量已经被声明但是由于还没有赋值还没有办法作为方法执行



