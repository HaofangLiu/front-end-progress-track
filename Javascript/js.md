# Javascript 相关知识点

## 地址栏输入URL后发生了什么
1. DNS域名解析；（浏览器缓存、系统缓存、路由器缓存、ISP缓存、DNS服务器）
2. 建立TCP连接；
3. 发送HTTP请求；
4. 服务器处理请求；（web服务器处理请求。 eg. apache、ngnix等）
5. 返回响应结果；
6. 关闭TCP连接；
7. 浏览器解析HTML；
8. 浏览器布局渲染；

## 浏览器的渲染机制
1. 解析 HTML 标签, 构建 DOM 树 
2. 解析 CSS, 构建 CSSOM 树 （对象模型object model）
3. 把 DOM 和 CSSOM 组合成 渲染树 (render tree) 
4. 在渲染树的基础上进行布局, 计算每个节点的几何结构 
5. 把每个节点绘制到屏幕上 (painting)


## 重绘 Repaint 和 回流 Reflow
* 重绘 绘制界面发生变化的部分（比如颜色发生变化）
* 回流 重新计算元素的几何尺寸，位置（页面节点消失，余下的节点向上移）
* 举例：
* 添加、删除、更新DOM节点(reflow 、repaint) 
* 修改元素的magin、padding、border（reflow、repaint） 
* display: none（reflow、repaint） 节点消失，从文档流删除
* visibility: hidden（repaint） 
* 修改颜色、背景色(repaint)


## 图片的请求
* 图片的加载不会影响其他资源的加载或者页面的渲染
* 不发请求的情况：
  1. css中写了一个无效的样式（比如选择器选中了一个不存在的节点）
  2. 父亲设置了display:none，脱离了文档流（加入节点自己设置了display:none也会发送请求）
* visibility:none都会发送请求
* html的img标签都会发送请求


## 阻塞解析与阻塞渲染
阻塞解析: 阻塞点后面的标签不会被解析，阻塞解析不一定阻塞其他外部资源的加载 
阻塞渲染: 阻塞点后面的标签会继续被解析，img,link等会继续发送请求获取外部资源，但不会触发页面渲染（白屏），也不会执行JavaScript代码。

## CSS加载
* CSS加载不会阻塞解析，但会阻塞渲染
* 现象：
  1. 白屏（DOM节点已经有了，但是css还在获取，加载时间久，还没有绘制出来）--->样式放在header
  2. FOUC（flash of unstyle content）先展示无样式内容，突然样式正常--->样式放在body
* 结论： 尽量link标签放在head内部，防止出现FOUC。但是可以通过处理（加载骨架）防止FOUC

## JS记载
* JS的加载和执行会阻塞解析（JS加载完成会立刻执行）
* 结论： 尽量把外置JS放在body最后，以便DOM尽快展现，同时方便JS操作DOM

## 异步加载async 与 defer
* `<script async src="script1.js"></script>`
* async: 加载和渲染后续文档元素的过程将和 script.js 的加载与执行并行 进行（异步）
* `<script defer src="script1.js"></script>`
* defer: 加载后续文档元素的过程将和 script.js 的加载并行进行（异步），但script.js 的执行要在所有元素解析完成之后执行

* async 
async的存在不影响DOM的解析和其他资源的加载， 特例独行，不保证顺序，不保证时机 
* defer 
defer存在不影响DOM的解析和其他资源的加载， 但是会保证在DOM资源准备就绪后再执行，并且对 于多个defer的外置js按顺序执行

运算符以及非严格比较的一些注意事项！[关于运算符的一些表现](https://zhuanlan.zhihu.com/p/351409061)


## 函数两种声明方式

### 函数声明
`function sum(x,y){}` ( 这种声明方式允许调用在前，声明在后)
### 函数表达式
`const sum = function (x,y) {}`


## 运行环境
* 全局环境 
* 函数环境
* JS在运行时会有执行[栈]来依次存放运行环境

## 作用域链
* 函数在运行的过程中，先从自己内部找变量
* 如果找不到，再从创建当前函数所在的作用域（词法作用域）去找，依次往上，直到全局作用域
* 注意找的是变量的此刻的状态

## 递归（自己调用自己）
* 
```
const fact = n => {
  if(n === 1) return 1;
  return n *(fact(n - 1))
}
```

```
const fib = (n) => {
  if ( n === 1 || n === 2) return 1;
  return fib(n-1) + fib(n - 2)
}
```

## 字符串相关
* \ ---》 将后边的符号转译为普通符号，没有任何作用
* .length  获取字符串的长度
* str[0]字符串某一位
* str.charAt(0) 同上
* str.charCodeAt(0) 某一位的ASCII码
* str.search('xx')寻找某字符串的index
* str.indexOf('xx') 同上
* str.lastIndexOf('xx')倒序寻找xx字符串的index
* str.includes('xx')是否包含某字符串
* str.startsWith('c') 是否以c开头
* str.endsWith('x') 是否以x结尾
* str.substr(1,3)字符串截取，从第几位开始（包含），截取几位
* str.substring(1,3)从第几位开始（包含），到第几位结束（不包含）
* str.slice(1,3)同上
* str.split('')空字符分割字符串
* str.trim()去掉两边空白字符 // trimLeft() trimRight()
* str.toUpperCase();
* str.toLowerCase();
* str.padStart(8,'*')填充字符串，从前边开始填充*直到长度为8


## 数组相关
* arr[index] 获取对应的index的值
* arr.pop() 返回arr最后一项  原本arr会改变
* arr.push() arr中加入一项，返回数组的新的长度 （往数组塞，返回长度）
* arr.unshift(10) arr头部加入一项，返回数组的长度
* arr.shift() 返回arr拿出第一项 原本arr会改变
* arr.splice（a,b,c）a.开始的索引（插入则在这个index之前） b.删除元素的个数（返回结果 是删除的元素） c.插入的新元素 | 返回一个由删除元素组成的新数组
* arr.concat() 可以用来拼接数组（但是也可以用来浅拷贝）
* arr.join('') 空数组进行连接
* arr.reverse() 数组顺序进行倒序（会改变原来的数组）
* arr.sort() 排序 sort((a,b) =>a - b) 从小到大 sort((a,b) =>b - a)从大到小
* arr.index(1) 寻找某一项的index，找不到返回-1
* arr.lastIndexOf(1) 倒序查找，找不到返回-1
* arr.forEach(value,index,array)
* arr.every(val => val > 0) 所有回调函数都返回true的时候才会返回true，否则返回false
* arr.some(val => val > 0)有一个回调函数都返回true的时候就返回true
* arr.filter(val => val > 0) 根据条件过滤出新的数组
* arr.map()遍历数组，回调函数返回值组成一个新数组返回，新数组索引结构和原数组一致，原数组不变（注意跟foeEach区别，forEach没有自动创建一个新数组）
* arr.reduce(func(v1,v2), initValue)遍历数组，调用回调函数，将数组元素组合成一个值

## JS内置对象
* JSON.stringify
* 用于把一个值变成符合JSON格式的字符串
* JSON.parse
* 用于把一个符合JSON格式的字符串还原对象

 ## Date
 * new Date()获取一个时间对象
 * d.getTime()返回实例对象距离1970年1月1日00:00:00对应的毫秒
 * d.getDate()返回实例对象对应的每个月的几号（从1开始）
 * d.getDay()返回星期几，星期一为1，星期日为0
 * d.getFullYear()返回四位年份
 * d.getMonth() 返回月份，一月为0，12月为11
 * d.getHours()返回小时(0~23)
 * d.getMilliseconds()返回毫秒(0~999)
 * d.getMinuts()返回分钟(0~59)
 * d.getSeconds()返回秒(0~59)

## Math
* Math.floor 向下取整
* Math.ceil 向上取整
* Math.round 四舍五入
* Math.abs 绝对值
* Math.max 取最大值
* Math.min 取最小值
* Math.random 随机数[0,1)