# 最近随手记

- 最近使用了阿里巴巴的矢量图标库iconfont的Symbol模式，非常简单好用，还是值得推荐

- 想画圆弧 除了使用border-radius  还可以用clip-path ellipse(80% 60% at 50% 40%)

- 写css渐变可以搜索 css gardient 来生成代码

- 复习grid布局发现grid-template-area 很好用

- vue3 用 js获取插槽内容  context.slots.defaults()

- 在onMount里面用watchEffect相当于 onMounted 和onUpdated时调用

- getBoundingClientRect()除了width height, 其他x,y top, bottm, left, rigth都是获取相对于左上角的距离

- {left:left} 析构赋值的重命名

- ts中非空判断 ?. === &&

# js任务队列 
还记得去年毕业的时候，一位面试官跟我讨论起js单线程的这些特点，记得当时上来就是问，为什么js是单线程？年幼无知的我满脑子都是问好， 我怎么知道？这不就是当时作者写的时候设计的时候就是这样子设计的吗？随后听完了面试官的解释也是牢记到了现在，今天真好看到了相关的一些文章，便更深层次的记录下自己所学到的知识点：

JS作为浏览器的脚本语言，主要的用途就是与用户互动，操作dom，这也是根本原因决定JS是单线程的原因。 设想一个线程在DOM上添加元素，而另一个线程删除了这个节点，那这个时候应该听谁的？

单线程，也就是说，所有的任务都需要排队来让线程依次执行，如果遇到耗时任务，那队伍中剩下的任务都要等着任务处理结束。所以JS的作者就设计了同步/异步任务来提高运行效率。

同步任务：在主线程上等待执行任务，前一个结束后一个才会执行。

异步任务：不进入主线程，进入任务队列，等待任务队列通知主线程，某个异步任务可以执行了，这个任务才可以进入主线程执行。

可以从这张单线程模型图上重新理解一下：

![任务队列](./1.jpg)

程序在运行的过程会产生堆(heap，存放对象，数据，垃圾回收就是这里)和栈(stack)

所有任务都会在主线程上执行，形成一个执行栈(execution stack)---先进后出

除了主线程，还有一个任务队列(task queue)，只要异步任务有了运行结果，就会在任务队列中放置一个事件---先进先出

当stack中的所有同步任务执行完毕，就会来读取queue，对应的异步任务就会结束等待状态，进入执行栈，开始执行

重复以上三个步骤

注意：任务队列是一个事件的队列，IO设备完成一项任务，就会在任务队列中添加一个事件，表示相关异步任务可以进入执行栈了。主线程读取的就是这里面的事件。

除了IO设备的事件以外，还有一些用户产生的事件（点击滚动等）， 通过指定过回调函数，这些事件发生时就会进入任务队列，等待主线程读取。

回调函数，说的就是被挂起来的代码，异步任务必须指定回调函数，当主线程开始执行异步任务，就是执行异步任务的回调函数

Js 中，有两类任务队列：宏任务队列（macro tasks）和微任务队列（micro tasks）。宏任务队列可以有多个，微任务队列只有一个。

宏任务：script（全局任务）, setTimeout, setInterval, setImmediate, I/O, UI rendering.

微任务：process.nextTick, Promise, Object.observer, MutationObserver.

# 用flex做导航栏的方法
用flex时注意看要求是什么？

在logo居中的情况下：

 1. 假如左右两边的导航栏个数相同，给logo添加
`flex: 1`
就可以让logo 占据多余的空间，然后让其余标签分散开就好。

因为加入标签个数不一样的话，会让logo不是居中的，它仅仅会计算多余的空间，然后在计算出的长度居中。

2. 假如导航栏左右的菜单不是相同个数，解决方案是用div分开左中右，然后给flex container中的item 分别设置 

```
text-align: left | center | right；
flex：3
```

就可以设计出一个左中右布局的导航栏。 这个时候

`justify-content: flex-start | center | flex-end`

给什么值都可以。


小技巧：

用a做标签时，可以用padding来增大可点击范围，否则仅仅字体可点击会增加用户选择的难度。

# js原型链
今天复习一下js中的原型链~

对于如下代码，调用arr.reverse()的时候会让数组实现逆序排，调用arr.toString()会用字符串形式展示数组内容。

那么问题来了，arr的reverse方法是在哪里定义的？toString方法是哪里定义的？

```
let arr = [1, 3, 2, 0]
arr.reverse()
arr.toString()
```
在控制台中打印出我们这个array，展开后观察_proto_:

![arr](./2.jpg)

可以看到这个array的实例的原型上，继承了Array的prototype，可以简单的通过下图验证：

![arr](./3.jpg)

也就是说，所有的函数都包含一个.prototype属性，可以理解成一个空对象，当去用这个函数new一个对象时，这个新对象的__proto__属性都会指向函数的prototype属性

使用这个对象时，它会先从自由属性开始找，找不到再从._proto__中去找。

所以reverse就是在Array函数的原型链上

但是toString呢？

![arr](./4.jpg)

当继续展开后发现：

Array函数的._proto_是一个普通对象，是由new Object函数创建的，toString其实来源于这里。

toString来自于对象函数的原型链上

instanceof 这个函数就是用于检测构造函数的prototype属性是不是出现在某个实例对象的原型链上。几个验证：

[] instanceof Array // true

{} instanceof Object //true

(function(){}) instanceof Function //true

Object instanceof Function // true

总结

原型链的本质就是链表，原型链上的节点是各种原型对象， 比如 Function.prototype, Object.prototype, Array.prototype....

原型链就是通过__proto__属性链接各种原型对象。

所有实例都是先指向自己类型的原型链， 然后指向对象原型链，最后再指向空

obj -> Object.prototype -> null

func -> Function.prototype -> Object.prototype -> null

arr -> Array.prototype -> Object.prototype -> null

Add：

```
Object instanceof Function
true
Function instanceof Object
true
```

Object, Function, Array等等这些都被称作是构造“函数”，他们都是函数。而所有的函数都是构造函数Function的实例。从原型链机制的的角度来说，那就是说所有的函数都能通过原型链找到创建他们的Function构造函数的构造原型Function.protorype对象

# JWT

JWT（JSON Web Token），本质就是一个字符串书写规范，如下图，作用是用来在用户和服务器之间传递安全可靠的信息

在目前前后端分离的开发过程中，使用token鉴权机制用于身份验证是最常见的方案，流程如下：

服务器当验证用户账号和密码正确的时候，给用户颁发一个令牌，这个令牌作为后续用户访问一些接口的凭证
后续访问会根据这个令牌判断用户时候有权限进行访问

Token，分成了三部分，头部（Header）、载荷（Payload）、签名（Signature），并以.进行拼接。其中头部和载荷都是以JSON格式存放数据，只是进行了编码

每个JWT都会带有头部信息，这里主要声明使用的算法。声明算法的字段名为alg，同时还有一个typ的字段，默认JWT即可。以下示例中算法为HS256

`{  "alg": "HS256",  "typ": "JWT" }`

因为JWT是字符串，所以我们还需要对以上内容进行Base64编码，编码后字符串如下：

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`

payload
载荷即消息体，这里会存放实际的内容，也就是Token的数据声明，例如用户的id和name，默认情况下也会携带令牌的签发时间iat，通过还可以设置过期时间，如下：

```
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

Signature
签名是对头部和载荷内容进行签名，一般情况，设置一个secretKey，对前两个的结果进行HMACSHA25算法，

如何实现

Token的使用分成了两部分：

生成token：登录成功的时候，颁发token
验证token：访问某些资源或者接口时，验证token

优点：

json具有通用性，所以可以跨语言
组成简单，字节占用小，便于传输
服务端无需保存会话信息，很容易进行水平扩展
一处生成，多处使用，可以在分布式系统中，解决单点登录问题
可防护CSRF攻击

1.test、include、exclude三个配置项来缩⼩loader的处理范围
2.resolve.modules 直接指明这个路径
3.resolve.alias 接指定⽂件，避免这处的耗时
4.MiniCssExtractPlugin 将CSS提取到单独的文件中
5.optimize-css-assets-webpack-plugin 压缩CSS
6.optimize-js-plugin 压缩JS
7.html-webpack-plugin 压缩html
8.treeshaking mode是production就会⽣效
9.splitChunks 将公共代码抽离出来
10.cache-loader 性能消耗比较大的loader生产的结果缓存在磁盘中 下次再次打包时如果是相同的代码就可以直接读取缓存

