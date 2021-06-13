# Javascript 相关知识点

## 地址栏输入 URL 后发生了什么

1. DNS 域名解析；（浏览器缓存、系统缓存、路由器缓存、ISP 缓存、DNS 服务器）
2. 建立 TCP 连接；
3. 发送 HTTP 请求；
4. 服务器处理请求；（web 服务器处理请求。 eg. apache、ngnix 等）
5. 返回响应结果；
6. 关闭 TCP 连接；
7. 浏览器解析 HTML；
8. 浏览器布局渲染；

## 浏览器的渲染机制

1. 解析 HTML 标签, 构建 DOM 树
2. 解析 CSS, 构建 CSSOM 树 （对象模型 object model）
3. 把 DOM 和 CSSOM 组合成 渲染树 (render tree)
4. 在渲染树的基础上进行布局, 计算每个节点的几何结构
5. 把每个节点绘制到屏幕上 (painting)

## 重绘 Repaint 和 回流 Reflow

- 重绘 绘制界面发生变化的部分（比如颜色发生变化）
- 回流 重新计算元素的几何尺寸，位置（页面节点消失，余下的节点向上移）
- 举例：
- 添加、删除、更新 DOM 节点(reflow 、repaint)
- 修改元素的 magin、padding、border（reflow、repaint）
- display: none（reflow、repaint） 节点消失，从文档流删除
- visibility: hidden（repaint）
- 修改颜色、背景色(repaint)

## 图片的请求

- 图片的加载不会影响其他资源的加载或者页面的渲染
- 不发请求的情况：
  1. css 中写了一个无效的样式（比如选择器选中了一个不存在的节点）
  2. 父亲设置了 display:none，脱离了文档流（加入节点自己设置了 display:none 也会发送请求）
- visibility:none 都会发送请求
- html 的 img 标签都会发送请求

## 阻塞解析与阻塞渲染

阻塞解析: 阻塞点后面的标签不会被解析，阻塞解析不一定阻塞其他外部资源的加载
阻塞渲染: 阻塞点后面的标签会继续被解析，img,link 等会继续发送请求获取外部资源，但不会触发页面渲染（白屏），也不会执行 JavaScript 代码。

## CSS 加载

- CSS 加载不会阻塞解析，但会阻塞渲染
- 现象：
  1. 白屏（DOM 节点已经有了，但是 css 还在获取，加载时间久，还没有绘制出来）--->样式放在 header
  2. FOUC（flash of unstyle content）先展示无样式内容，突然样式正常--->样式放在 body
- 结论： 尽量 link 标签放在 head 内部，防止出现 FOUC。但是可以通过处理（加载骨架）防止 FOUC

## JS 记载

- JS 的加载和执行会阻塞解析（JS 加载完成会立刻执行）
- 结论： 尽量把外置 JS 放在 body 最后，以便 DOM 尽快展现，同时方便 JS 操作 DOM

## 异步加载 async 与 defer

- `<script async src="script1.js"></script>`
- async: 加载和渲染后续文档元素的过程将和 script.js 的加载与执行并行 进行（异步）
- `<script defer src="script1.js"></script>`
- defer: 加载后续文档元素的过程将和 script.js 的加载并行进行（异步），但 script.js 的执行要在所有元素解析完成之后执行

- async
  async 的存在不影响 DOM 的解析和其他资源的加载， 特例独行，不保证顺序，不保证时机
- defer
  defer 存在不影响 DOM 的解析和其他资源的加载， 但是会保证在 DOM 资源准备就绪后再执行，并且对 于多个 defer 的外置 js 按顺序执行

运算符以及非严格比较的一些注意事项！[关于运算符的一些表现](https://zhuanlan.zhihu.com/p/351409061)

## 函数两种声明方式

### 函数声明

`function sum(x,y){}` ( 这种声明方式允许调用在前，声明在后)

### 函数表达式

`const sum = function (x,y) {}`

## 运行环境

- 全局环境
- 函数环境
- JS 在运行时会有执行[栈]来依次存放运行环境

## 作用域链

- 函数在运行的过程中，先从自己内部找变量
- 如果找不到，再从创建当前函数所在的作用域（词法作用域）去找，依次往上，直到全局作用域
- 注意找的是变量的此刻的状态

## 递归（自己调用自己）

-

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

- \ ---》 将后边的符号转译为普通符号，没有任何作用
- .length 获取字符串的长度
- str[0]字符串某一位
- str.charAt(0) 同上
- str.charCodeAt(0) 某一位的 ASCII 码
- str.search('xx')寻找某字符串的 index
- str.indexOf('xx') 同上
- str.lastIndexOf('xx')倒序寻找 xx 字符串的 index
- str.includes('xx')是否包含某字符串
- str.startsWith('c') 是否以 c 开头
- str.endsWith('x') 是否以 x 结尾
- str.substr(1,3)字符串截取，从第几位开始（包含），截取几位
- str.substring(1,3)从第几位开始（包含），到第几位结束（不包含）
- str.slice(1,3)同上
- str.split('')空字符分割字符串
- str.trim()去掉两边空白字符 // trimLeft() trimRight()
- str.toUpperCase();
- str.toLowerCase();
- str.padStart(8,'*')填充字符串，从前边开始填充*直到长度为 8

## 数组相关

- arr[index] 获取对应的 index 的值
- arr.pop() 返回 arr 最后一项 原本 arr 会改变
- arr.push() arr 中加入一项，返回数组的新的长度 （往数组塞，返回长度）
- arr.unshift(10) arr 头部加入一项，返回数组的长度
- arr.shift() 返回 arr 拿出第一项 原本 arr 会改变
- arr.slice(start,end) 返回一个新数组，左闭右开，end 可有可无，如果没有就是到结尾
- arr.splice（a,b,c）a.开始的索引（插入则在这个 index 之前） b.删除元素的个数（返回结果 是删除的元素） c.插入的新元素 | 返回一个由删除元素组成的新数组
- arr.concat() 可以用来拼接数组（但是也可以用来浅拷贝）
- arr.join('') 空数组进行连接
- arr.reverse() 数组顺序进行倒序（会改变原来的数组）
- arr.sort() 排序 sort((a,b) =>a - b) 从小到大 sort((a,b) =>b - a)从大到小
- arr.index(1) 寻找某一项的 index，找不到返回-1
- arr.lastIndexOf(1) 倒序查找，找不到返回-1
- arr.forEach(value,index,array)
- arr.every(val => val > 0) 所有回调函数都返回 true 的时候才会返回 true，否则返回 false
- arr.some(val => val > 0)有一个回调函数都返回 true 的时候就返回 true
- arr.filter(val => val > 0) 根据条件过滤出新的数组
- arr.map()遍历数组，回调函数返回值组成一个新数组返回，新数组索引结构和原数组一致，原数组不变（注意跟 foeEach 区别，forEach 没有自动创建一个新数组）
- arr.reduce(func(v1,v2), initValue)遍历数组，调用回调函数，将数组元素组合成一个值

## JS 内置对象

- JSON.stringify
- 用于把一个值变成符合 JSON 格式的字符串
- JSON.parse
- 用于把一个符合 JSON 格式的字符串还原对象

## Date

- new Date()获取一个时间对象
- d.getTime()返回实例对象距离 1970 年 1 月 1 日 00:00:00 对应的毫秒
- d.getDate()返回实例对象对应的每个月的几号（从 1 开始）
- d.getDay()返回星期几，星期一为 1，星期日为 0
- d.getFullYear()返回四位年份
- d.getMonth() 返回月份，一月为 0，12 月为 11
- d.getHours()返回小时(0~23)
- d.getMilliseconds()返回毫秒(0~999)
- d.getMinuts()返回分钟(0~59)
- d.getSeconds()返回秒(0~59)

## Math

- Math.floor 向下取整
- Math.ceil 向上取整
- Math.round 四舍五入
- Math.abs 绝对值
- Math.max 取最大值
- Math.min 取最小值
- Math.random 随机数[0,1)

## 正则表达式

- /...../g 会被解析成正则表达式
- `new RegExp('+86\d{11}','g')`构造函数方式创建
- g -
- i -忽略大小写，默认大小写敏感
- m -多行搜索
- `regexp.test('aaa')`字符串是否符合规则,返回 boolean
- `string.search(/abc\d/)`返回匹配到的第一个结果的 index，如果没有是-1
- `string.match(/abc\d/g)`返回匹配到的 arr ['abc1','abc2']
- `string.replace(/abc\d/g,'hi')`将 abc2 替换为 hi
- `string.split(/\s/)`基于空格分离字符串，返回数组结果
- 有意义的字符，需要用\转义：( [ { \ ^ $ | ) ? \* + .
- [abcd]中括号：匹配一个字符，可以是 abcd 任意一个
- [0-9]同理
- [a-zA-Z]匹配一个不限制大小写的字母
- [^abc]表示一个不是 a/b/c 的字符
- . 等价于匹配一个除了回车和换行以外的任意字符[^\r\n]
- \d 等价于一个数字字符[0-9]
- \D 等价于非数字字符[^0-9]
- \s 匹配一个空白字符[ \t\n\r\v\f]匹配一个空白字符
- \S 匹配一个非空白字符
- \w 匹配一个字母数字下划线[a-zA-Z0-9_]
- \W 匹配一个非单词字符
- ? 前面的字符出现 0 或者 1 次
- \+ 前面的字符出现一次或者多次
- \* 前面的字符出现 0 次或者多次
- {n} 前面的字符出现 n 次
- {n,m} 前面的字符出现 n 到 m 次
- {n,} 前面的字符出现至少 n 次
- /^xyz/ 必须以 xyz 开头 注意区分[^]里面的是除了
- /abc$/必须以 abc 结尾
- /\babc\b/ 匹配时单词的 abc（左右两侧时字符串开头、结尾、中横线、空格）
- /\Babc\B/ 匹配不是单词的 abc
- 贪婪模式：默认尽可能多的匹配，如果想使用非贪婪模式，则可以在量词后加？`'12345'.match(/\d{3,5}?/g)`
- () 正则的分组，有几个括号就是$1/2/3...
- i 不区分大小写 g 全局匹配 m 多行匹配

### 异步与回调

- 同步任务：在主线程上等待执行任务，前一个结束后一个才会执行。
- 异步任务：不进入主线程，进入任务队列，等待任务队列通知主线程，某个异步任务可以执行了，这个任务才可以进入主线程执行。
- 回调函数，说的就是被挂起来的代码，异步任务必须指定回调函数，当主线程开始执行异步任务，就是执行异步任务的回调函数

### 原型链

- obj.**proto** === Class.prototype
- instanceof 用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上

### 多个逻辑运算符

- || 或运算寻找第一个真值
- 一个或运算 || 的链，将返回第一个真值，如果不存在真值，就返回该链的最后一个值。

- && 与运算寻找第一个假值
- 与运算返回第一个假值，如果没有假值就返回最后一个值。

- 与运算 && 的优先级比或运算 || 要高。

### 继承

- 继承可以使得子类具有父类的各种属性和方法，而不需要再次编写相同的代码。在令子类别继承父类别的同时，可以重新定义某些属性，并重写某些方法，即覆盖父类别的原有属性和方法，使其获得与父类别不同的功能。
- 写在 class 的属性和方法会挂在 prototype 上
- Object.create(proto,propsDescription) 以 proto 为原型属性创建对象{}
- hasOwnProperty 判断对象自身属性中是否具有指定的属性
- Object,assign(target, source, source1,source2....) 将所有可枚举属性,从一个或多个源对象赋值到目标对象, 返回目标对象
- Mixin 通过不使用继承的方式让一个类中的方法被其他类复用 （利用 Object.assign 实现）
- getter / setter 将对象属性绑定到查询/设置该属性时将被调用的函数
- static 静态属性 使用的时候需要用类名调用，实例没办法直接调用。可以继承
- new 一个函数： 首先创建一个空对象，执行这个函数，遇到 this 就是对这个 obj 操作，最后返回创建的新对象
- 方法的原型默认有一个 constructor，一般是指向自身 class、func

### 闭包

- 闭包是由函数以及创建该函数的词法环境组合而成。这个环境包含了这个闭包创建时所能访问的所有的局部变量

### DOM 文档对象模型

- document.head/.body/.title/.location(href/search/hash/reload/assign)
- node.nodeName：元素标签名，还有个类似的 tagName
- node.nodeType：元素类型
- node.className：类名
- node.id：元素 id
- node.children：子元素列表（HTMLCollection）
- node.childNodes：子元素列表（NodeList）
- node.firstChild：第一个子元素
- node.lastChild：最后一个子元素
- node.nextSibling：下一个兄弟元素
- node.previousSibling：上一个兄弟元素
- node.parentNode：父元素
- //es3 写法，不推荐
- document.getElementById('id') //Element
- document.getElementsByClassName('class') //HTMLCollection
- document.getElementsByTagName('p') //HTMLCollection，需要转化，可以用 Array.from()或者[...类数组]的方法来便利
- document.getElementsByName('username') //NodeList，有 foreach 方法
- //ES5 写法，推荐
- document.querySelector('.box') //Element
- document.querySelectorAll('.box') //NodeList

### DOM 事件

事件绑定

- node.onclick = function(e){}
- node.addEventListener('click', function(e){})
- 在函数里面可以使用事件对象 e
- 函数里面的 this 代表 node 本身，如果用箭头函数则没有 this（this 指向 window）

### class 操作

- 常见 API
- node.className 老方法，用起来不严谨，尽量不用
- node.classList.add
- node.classList.remove
- node.classList.contains
- node.classList.toggle

### 属性操作

- node.getAttribute('id')
- node.setAttribute('data-id','100')
- node.removeAttribute('checked')
- document.createAttribute('checked')
- node.setAttributeNode(attrNode) ==》 node.setAttributeNode(document.createAttribute('checked'))

### 元素创建

- document.createElement('div')
- 创建 DOM 节点，参数是标签名
- document.createTextNode("Hello")
- 创建文本节点，参数是字符串
- document.createDocumentFragment()
- 创建一个虚拟的 DOM，用于提升性能，避免高频 DOM 操作

### 元素复制添加修改删除

parentNode.appendChild(childNode)

- 在父亲的末尾添加元素
- parentNode.insertBefore(newNode, referenceNode)
- 把 newNode 插入到 referenceNode 元素之前
- parentNode.replaceChild(newChild, oldChild)
- 把 oldChild 替换为 newChild
- parentNode.removeChild(childNode)
- 从 parentNode 里删除 childNode
- node.cloneNode(true)
- 克隆一个元素，参数 true 的时候会深复制，也就是会复制元素及其子元素，false
  的时候只复制元素本身

### 获取样式

- 使用 getComputedStyle 获取元素计算后的样式，不要通过 node.style.属性获取

### JS 事件

- 事件是在编程时系统内发生的动作或者发生的事情（单击，双击，鼠标放置，表单内容发生变化，拖拽，页面滚动等等）

## DOM 事件流

- 三个阶段： 事件捕获阶段，处于目标阶段（可以假装不存在），事件冒泡阶段
- addEventListern('type',()=>{},true（发生在哪个阶段）)true 发生在捕获阶段调用 listener ，false 发生在冒泡阶段（默认）
- 第三个参数有两种用法，options{once 是否仅监听一次: true ||false, capture 是否捕获阶段监听:true || false, passive 是否忽略 preventDefault :true||false } 和 useCapture(true || false)
- 阻止事件传播： e.stopPropagation()
- 阻止默认事件： e.preventDefault() 比如 a 链接自动跳转或者 form 表单 input type = submit

## 事件代理

- 事件绑定代理给都元素，由父元素根据事件来源统一处理
- 实际上是事件冒泡的应用

### BOM 浏览器对象模型

- window 对象： var 声明的变量，或者 function fn（）声明，都是 window 的属性
- navigator 对象：浏览器相关的信息 navigator.userAgent
- screen 屏幕相关信息
- offsetHeight 页面文档的高度 screen.height 屏幕高度
- clientHeight 视窗高度 等价于 window.innerHeight
- window.scrollY || document.documentElement.scrollTop 当前页面滚动了多少
- element.offsetParent 距离最近的是定位元素的祖先元素
- element.offsetTop 到距离最近的是定位元素的祖先元素的距离
- element.getBoundingClientRect()在当前窗口占据多少
- element.getBoundingClientRect().top + document.body.scrollTop 元素距离页面顶部的距离
- const isShow = node => node.getBoundingClientRect().top < window.innerHeight && node.getBoundingClientRect().top > 0

## 检测设备

const isAndroid = () => /android/i.test(navigator.userAgent)
const isIPhone = () => /iphone/i.test(navigator.userAgent)
const isIOS = () => /iphone|ipad/i.test(navigator.userAgent)

## 滚动

- scrollTo({top:100, left:0,behavior:'smooth'})滚动到哪里
- scrollBy({top:window.innerHeight, left:0,behavior:'smooth'})平滑滚动多少
- decodeURI()
- decodeURIComponent()
- encodeURI() 不会对 : / ? & = # 编码
- encodeURIComponent() 会对 : / ? & = # 编码

## cookie seesion

- cookie 最大容量 4k 记录某些页面关闭或者刷新后仍然需要记录的信息； cookie 每次发送请求时都会在请求头中。（常规后端设置，但是前端设置也可以）

### 如何与后端交互

- Form 表单提交： 只有 get 和 post || 有问无答，体验不佳
- AJAX 支持 XMLHttpRequest || Fetch
- WebSocket 可以由服务器端主动发起
- Object.entries () 返回一个数组，其元素是与直接在 object 上找到的可枚举属性键值对相对应的数组。
- 轮询：每隔固定时间发一次请求
- 长轮询：客户端发请求等待响应，当响应时再次发请求。 服务器端，请求到来，如果没新数据，则不发，当有新数据通知客户端，再响应

### 回调&异步
- 回调：传一个函数进去。如果多层回调就会带来回调地狱的问题
- Promise三个状态：pending | fulfilled | rejected
- async/await 

