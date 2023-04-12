# typescript 知识点

## ts 如何运行

- 一段 js 代码可以直接运行在浏览器/nodejs 环境中， 但是 ts 需要进行类型擦除才可以运行在浏览器/nodejs，否则会直接报错。 但可以通过 deno 直接运行。
- 如果需要擦除类型，可以使用的包包含：

  - esbuild （快，不检查 ts 语法） `npm i -g esbuild`
  - swc （快，不检查 ts 语法） `npm i -g @swc/cli @swc/core`
  - tsc （慢， 会检查语法） `npm i -g typescript`
  - babel （慢， 会检查语法， 依赖多，需要在项目中运行）`npm i @babel/core @babel/cli @babel/preset-typescript`

## 类型擦除

简单来讲就是 ts 经过类型擦除可以转化成 ES6 代码
![ts compile](./1.png)

## 数据类型

### JS / TS 类型

#### JS

- null / undefined / string / number / boolean / object / Symbol / bigint

#### ts

- 以上所有， 加上
- void / never / enum / unknown / any
- 再加上自定义类型 type / interface

### 为什么有两个 number/Number | string/String | boolean/Boolean 呢？

- 因为被 js 做了一层包装对象
- `42.toFixed(2)`等价于
  ```
  let temp = new Number;
  value = tem.toFixed(2);
  delete temp
  return value;
  ```
- 所以 JS 中的 Number String Boolean 只用于包装对象
- 正常情况下 js/ts 都不用

### Object 类型

- 正常不会直接使用 object 类型在 ts
- 对象 = 普通对象

  - 数组对象 Array
  - 函数对象 Function
  - 正则对象 RegExp
  - 日期对象 Date

#### 如何在 ts 中描述对象数据类型？

1. 用 class 或者 constructor 描述
2. 使用 type 或者 interface 描述

```Javascript
//索引签名
//k可以为任意
type A = {
  [k: string]: string;
};
//等于泛型
type A2 = Record<string, number>;
```

- 结论： ts 一般使用索引签名或者 `Record` 泛型来描述普通对象

### 数组对象
```Javascript
type A = string[];

//等价于
type AA = Array<string>
```
- 结论： ts一般使用`Array<?>`或者`string[]`或者`[string, number]`来描述数组

### 函数对象
```Javascript
type fnA = (a: number, b: number) => number;
```

- 结论： ts一般使用`() => ?` 来描述函数



