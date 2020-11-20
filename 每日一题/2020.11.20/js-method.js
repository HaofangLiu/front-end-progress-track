//1、 函数式声明

function funName(arg1, arg2) {
  alert(arg1 + "," + arg2);
}

// 特点：此种方式可定义命名的函数变量，而无需给变量赋值，这是一种独立的结构，不能嵌套在非功能模块中。函数名在自身作用域和父作用域内是可获取的（其他域是娶不到的）。当解析器读取js代码时，会先读取函数的声明，此种方式定义的函数在执行任何代码之前都可以访问（调用）。

//2、 函数表达式（函数字面量）

var fun = function (arg1, arg2) {
  alert(arg1 + "a" + arg2);
};
var fun = (function funName(arg1, arg2) {
  alert(arg1 + "," + arg2);
})(function hello() {
  alert("“HelloWorld!!!”");
})(); // 自调用

//特点：地中方式是将函数定义为表达式语句的一部分。函数可以是命名的也可以是匿名的。而且必须等到解析器执行到它所在的代码行才能真正被解释执行。

//3、 函数构造法，参数必须加引号

var fun = new Function("arg1", "arg2", "alert(arg1 + “,” + arg2)");

//特点：从技术角度讲，这是一个函数表达式。但是一般不推荐这种方式。

//4、 对象直接量

var obj = {
  name: "",

  getName: function () {
    return this.name;
  },

  setName: function (name) {
    this.name = name;
  },
};

//特点：将方法的定义看做为一个对象的成员变量，此时对象的变量值为一个方法，通过访问该对象的属性名称，达到调用方法的效果。

//5、 原型继承

var obj = new Function();

obj.prototype = {
  name: "",

  getName: function () {
    return this.name;
  },

  setName: function (name) {
    this.name = name;
  },
};

//特点：定义了一个函数对象，在其原型对象中定义方法。在使用prototype的方法时，必须实例化该对象才能调用其方法。

//6、 工厂模式

function obj() {
  var temp = new Object();

  temp.name = "";

  temp.getName = function () {
    return this.name;
  };

  temp.setName(name) = function () {
    this.name = name;
  };

  return temp;
}

//特点：工厂模式是软件工程领域一种广为人知的设计模式，由于在ECMAScript中无法创建类，因此用函数封装以特定接口创建对象。即在一个函数内创建一个对象，给对象赋予属性和方法再将其对象返回。
