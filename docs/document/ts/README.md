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


### any/unknown/never

- any全知全能
- unknown 适合值从外部获取，不确定类型时候使用。 尽量使用这个然后自己去断言
- never 空集合不包含任何类型

### enum 枚举类型

#### 应用场景1 数字情况
```ts
// 什么时候用enum
// 数字 初始值为0

enum A {
  todo,
  done,
  archived,
  deleted,
}
```
#### 应用场景2 前端权限管理

```ts
enum Permission {
  None = 0,
  Read = 1 << 0,
  Write = 1 << 1,
  Delete = 1 << 2,
  Manage = Read | Write | Delete,
}

type User = { 
  permission: Permission;
};

//0b开头证明这是二进制在js中
const user: User = {
  permission: 0b0010,
};

// 任何一个x 与 Permission.Write 进行与操作（&） 结果等于Permission.Write， 那证明权限拥有
// 因为 与&预算， 都是1才为1
if ((user.permission & Permission.Write) === Permission.Write) {
  console.log("user has right to write");
}
```

#### 什么时候不用enum
- 使用string | other 类型时， 不用enum
- 原因是可以使用更为简单直接的写法， 可直接提示赋值


### type
- 类型别名 Type Aliases
- 给其他类型取个名字(并没有产生真的人)
- 几乎什么时候都可以用
- type不可以重新赋值

```ts
type Name = string
type FalseLike = ' | 0 | false | null | undefined
type Poinr = {a: number, b:number}
type Points = Points[];
type Line = [Point, Point]
type Circle = {center:P:oint; radisu : number}
type Fn= (a:number) => number
type FnWithProp = {
  //note: 对象中声明函数不能像上面用箭头函数，要用冒号
  (a: number, b: number): number;
  prop: string;
};
```


### interface

- 用来声明接口
- 描述对象的属性(declare the shapes of objects)
- interface自动合并

```ts
interface Date {
  [key: string]: string;
}
interface Point {
  x: number;
  y: number;
}
interface Points extends Array<Point> {}
interface Fn {
  (x: number, y: number): number;
}
```

![ts interface](./2.png)


### type interface 区别

- 区别1: interface只描述对象 type则描述所有数据
- 区别2： type 只是别名， interface是（真名）类型声明
- 区别3： 对外API尽量用interface， 方便拓展。 对内部API尽量用type, 防止代码分散

### void
- 返回空， 但是编译不会报错， 如果想要使用返回值时报错
- 






