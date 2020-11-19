//eval() 函数会将传入的字符串当做 JavaScript 代码进行执行。
const val = (argu) => {
  if (typeof argu === Object) {
    return argu;
  } else {
    return `${argu}`;
  }
};
