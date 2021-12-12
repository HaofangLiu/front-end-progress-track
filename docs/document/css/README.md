# CSS

## 文档流：

### 什么是普通流

- 就是元素在正常情况下默认的摆放规则
- 块级元素宽度撑满父亲、高度由内容撑开，可以设置宽高。按照在 HTML 里的顺序从上到下排列，会出现边距合并
- 内联元素的宽高与内容一致，无法设置宽高，只要有足够空间就会在一行排列，如果空间不够会下移一行

### 什么是脱离普通流

- 就是元素不按默认规则摆放了，其他正常元素在计算自己的摆放位置时不把脱离普通流的元素包括在内

## 宽度：

- 永远不要写宽度 100%

- block（div）默认能有多宽有多宽 ｜ div width 默认宽度是 auto（！不是 100%）

- inline 宽度默认是 inline 的和

- 经验： 不要在 inline 里面写 block

- inline-block 结合两个的特点.可用 width

## 高度：

- inline 高度是由 line-height 间接确定的，跟 height 无关

- block 高度跟内部文档流元素决定的，可以设定 height

- inline-block 跟 block 类似，可以设置 height

## 脱离文档流

- float
- float 属性能让一个元素放在其容器的左侧或右侧，允许文本和内联元素环绕它。 设置浮动的元素从网页的普通流(normal flow)中脱离，但不是完全脱离

- position:absolute/fixed
  static: 元素正常的布局行为
  relative: 元素做一些轻微的偏移（top/left/right/bottom）没有脱离正常的文档流（上下左右的位置偏移量是相对于参考元素的边框内壁来决定的）
  absolute: 相对于最近的非 static 元素进行定位，脱离普通文档流
  fixed: 相对于屏幕的视口（viewport）的位置来指定元素的位置。脱离文档流
  sticky:相对定位和固定定位的混合（当滚动的过程时相当于 relative，设置了 top 距离以后滚动，就会固定在上部）

## 布局

- 960 / 1000 / 1024

### float 布局

- 子元素 float 设置 float:left/right,并且给 width

- 父元素.`clearfix{content: '';display:block;clear:both}`

- 假如图片下面有多余的东西，可以用`vertical-align:top` 或者`vertical-align:middle` 去消除

- border 会影响时可以用 outline

- (如果是块级元素而且宽度固定)水平居中：margin：0 auto -> 最好替换为 margin-left margin-right: auto

- float 的平均布局可以用负 margin 来解决换行问题

- clear: left
- 要求该盒的 top border 边位于源文档中在此之前的元素形成的所有左浮动盒的底边下方
- clear: right
- 要求该盒的 top border 边位于源文档中在此之前的元素形成的所有右浮动盒的底边下方
- clear: both
- 要求该盒的 top border 边位于源文档中在此之前的元素形成的所有左浮动盒和右浮动盒的底边下方

### flex 布局

`display:flex`父亲设置，对外展示块级特性

先设置 continer，在设置 item

#### container

flex-direction row|row-reverse|column|column-reverse

flex-wrap nowrap|wrap|wrap-reverse

justify-content flex-start|flex-end|center|space-between|space-around|space-evenly

align-items flex-start|flex-end|center|stretch|baseline

align-content flex-start|flex-end|center|stretch|space-between|space-around

#### item

- order item 排列顺序，默认是 0，负数在前面，正数在后面
- flex-grow: 将多余的空间分配给 item（变胖）(用来“瓜分”父项的“剩余空间”。)
- flex-shrink 控制如何变瘦，在空间不够时如何缩小。默认是 1，可以给 0 来防止 item 变小(用来“吸收”超出的空间)
- flex-basis （理解为宽度）控制基准宽度，默认是 auto(设置子项的占用空间。如果设置了值，则子项占用的空间为设置的值； 如果没设置或者为 auto，那子项的空间为设置的 width/height 的值)
- align-self 自己这个 item 怎么对齐;
- flex : 1 === flex: 1 1 0%
- flex 的三个值，有单位的会对应为 flex basis，没有单位的两个数字会对应为 flex-grow flex-shrink，仅有一个无单位的数字时会对应 flex-grow

### grid 布局

`display:grid`

先设置父亲，再设置孩子
父亲 display: grid; grid: 行 行 行/列 列
孩子 gird-column: 1/2; grid-row: 3/4

#### container

grid-template-columns: 10px auto 10px
grid-template-rows:25% auto 100px

也可以用 fr 去等分份数

grid-template 是 grid-template-rows 和 grid-template-columns 的缩写形式。

比如说，grid-template: 50% 50% / 200px;将创建一个具有两行的网格，每一行占据 50%，以及一个 200 像素宽的列。

grid-template-areas: ” header header header“
"aside main ad"
"footer footer footer"

用 grid-area 去指定所对应的区域

row/column-gap 行/列间隔

#### item

grid-column-start
grid-column-end
(grid-column:可接受两个值，相当于上面两行，需要用/分开)
grid-row-start
grid-row-end
(grid-row 同理)
后面接收的都是第几根线

grid-area 属性接受 4 个由'/'分开的值：grid-row-start, grid-column-start, grid-row-end, 最后是 grid-column-end。

## 选择器

### 元素选择器(标签选择器)

`a{ text-decoration:none }`
`body{ font-size:14px }`

### id 选择器

`#id{border:1px solid black}`
`box-shadow 水平阴影的位置 垂直阴影的位置 模糊距离 阴影的大小 阴影的颜色`

### 类选择器

`.active{color:red}`

### 通用选择器

`* {margin:0; padding:0}`

### 属性选择器

- [attr]选择包含 attr 属性的所有元素，不论 attr 的值为何。
- [attr=val] 仅选择 attr 属性被赋值为 val 的所有元素。

```
/* 存在title属性的<a> 元素 */
a[title] {
  color: purple;
}

/* 存在href属性并且属性值匹配"https://example.org"的<a> 元素 */
a[href="https://example.org"] {
  color: green;
}

/* 存在href属性并且属性值包含"example"的<a> 元素 */
a[href*="example"] {
  font-size: 2em;
}

/* 存在href属性并且属性值开头是"http"的<a> 元素 */
a[href^="http"] {
  font-style: italic;
}

/* 存在href属性并且属性值结尾是".org"的<a> 元素 */
a[href$=".org"] {
  font-style: italic;
}

/* 存在class属性并且属性值包含以空格分隔的"logo"的<a>元素 */
a[class~="logo"] {
  padding: 2px;
}
```

```css
[disabled] {
  border: 1px solid #ccc;
}
[data-color="“gray”"] {
  color: #666;
}
```

## 组合选择

1. 逗号，同时选中
   `.a,.b{ color:red }`
2. 空格 A B 选择 A 的后代 B 元素（没有空格时则同时具备两个，p.className）
   `ul li {color:red}`
3. 大于号 A > B 选中 A 的直接 B 子元素
   `ul > li {color:red}`
4. 加号 A + B A 的下一个邻居（平级关系）
   `target + li{ }`
5. 波浪号 A ~ B A 的所有 B 邻居
   `target ~ li{ }`

## 伪类:(节点特殊的状态)

:link :visited :hover :active
:focus :root(选中根结点) :checked :disabled
:target(代表一个唯一的页面元素(目标元素)，其 id 与当前 URL 片段匹配 .) :not

## 伪元素::

::before
::after
（在元素内插入一段内容，作为元素的第一个/最后一个 孩子
必须有 content 属性
常用来替代图标、无实际意义的标签）

::first-line
::first-letter
::selection(用户选中的内容)

`xxx:first-child`
`xxx:nth-child(2)`
`xxx:last-child`

white-space:nowrap 文字不换行

### 优先级顺序

!important > 内联样式> 选择器设置样式 > 浏览器默认样式 > 继承样式
(内联)(id)(class、属性、伪类)(标签、伪元素)

对于同一级别的样式，比如都带有!important 则比较选择器权重

color: inherit 当前元素使用继承自父亲的 color，不管父亲是否设置了 color 属性。
color: initial 当前元素使用初始值，对于 a 链接来说初始值是黑色，而不是浏览器的默认样式蓝色
color: unset 如果是继承属性则继承父级，如果是非继承属性就用 initial value

## 外边距合并

- 只有块级元素外边距才会产生合并，内联元素和 inline-block 元素不会
- 外边距合并只限于上下外边距，左右外边距不会合并
- 加边框、加 padding、里面添加行内内容、创建块级格式化上下文等方法都可以阻止父子外边距合并

width: 100%，在标准盒模型下当前元素的 content 的宽度等于父亲的 content 宽度
width: 100%，在 IE 盒模型下当前元素的 content+padding+border 的总宽度等于父亲的 content 宽度

height: 100%, 表示当前元素的 content 的高度等于父亲 content 的高度
如果父元素没有设置 height 属性，给子元素设置 height:100%也是无效的
想让当前元素撑满屏幕，一直方法是给当前元素、上一级、上上级...直到 html 标签全都设置 height: 100%

## 浏览器渲染原理

- 根据 HTML 创建 HTML 树（DOM 树）
- 根据 CSS 创建 CSS 树（CSSOM）
- 将两个树合并为一个树（render tree）
- Layout 布局（文档流，盒模型，计算大小和面积）
- Pain 绘制（绘制边框颜色，文字颜色，绘画阴影等）
- Compose 合成（根据层叠关系展示页面）

- 小技巧：可以利用 [csstriggers.com](https://csstriggers.com/) 去验证重绘等行为

## transform

- 常用功能：translate, scale,rotate, skew
- 小技巧： 绝对定位元素的垂直居中； translate(-50%,-50%)

## transition

- transition: 属性名，时长，过渡方式，延迟
- 可以用 all 去代表所有属性

## 动画帧 @keyframs

- 写法 1:

```css
@keyframs xxx {
  0% {
  }
  30% {
  }
  100% {
  }
}
```

- 写法 2：

```css
@keyframs xxx {
  from {
  }
  to {
  }
}
```

- 用法： animation: 时长 ｜ 过渡方式 ｜ 延迟 ｜ 次数 ｜ 方向 ｜ 填充模式 ｜ 是否暂停 ｜ 动画名

## css 计量单位

- px： 像素
- em： 2em 相对于父亲字体大小的倍数（如果是非 font-size 属性对应的值，则 是相对于当前元素的 font-size
- rem： 2rem 根元素(html 或者:root)字体的倍数
- 百分比：80% 同 em 相对于父亲字体大小的倍数

## 字体

- text-align: center | left | right | justify（两边对齐，最后一行不生效）
  注意：应用在块级容器上，对块内元素生效

## 层叠上下文 stacking Context

### 什么是上下文：

- 是一个多方参与构建，遵循一定规则的、独立的环境
- 子项可能创建新的上下文，与外层上下文有同样的规则，且与外层上下文隔绝

### 形成层叠上下文的条件：

- 根元素（比如 html 是最根本的层叠上下文）
- z-index 不为 auto 的绝对定位和相对定位元素
- fixed、sticky 定位元素
- z-index 不是 auto 的 flex item
- z-index 不是 auto 的 grid item
- opacity 小于 1 的元素
- transform 不为 none 的元素

### 层叠规则：

- 属于同一层叠上下文的同级元素比较
- 当层叠上下文属于某一个层级时，其内的层叠上下文都属于对应层级.

- 注意观察形成的层级，他们的父亲的层级是多少

## BFC 块级格式化上下文

### 形成条件：

- 根元素`<html>`
- float 不为 none
- position 为 absolute\fixed\sticky
- display 为 inline-block、table-cell
- display: flow-root 或者 flow-root list-item（推荐，但兼容性不好）
- overflow 为 hidden、scroll、auto(不为 visible)；

## BFC 特性

### 特性

- 内部的块级盒子会在垂直方向，一个接一个地放置。
- 两个盒子垂直方向的间距由 margin 决定。属于同一个 BFC 的两个相邻盒子的外边距会发生折叠。
- BFC 的区域不会与浮动盒重叠。
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
- 计算 BFC 的高度时，浮动元素也参与计算。

## BFC 应用

- 阻止父子外边距合并 [阻止合并](http://js.jirengu.com/tavop/1/edit?html,css,output)
- 阻止块级元素与浮动元素的覆盖(创建 BFC 后，p 不与浮动元素重叠，文字也不会围绕浮动元素)[隔离](http://js.jirengu.com/cihiw/1/edit)
- 清除浮动[clearfix](http://js.jirengu.com/loliy/1/edit)

注意： 创建 BFC 需要添加额外的属性，而这些属性有各自特殊作用， 往往会带来一定副作用。display: flow-root 虽然无副作用，但兼容 性很差（ https://caniuse.com/#search=flow-root ）。因此多数 情况下清除浮动使用伪元素 clearfix 的方式

## 渐进增强

- 针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能 达到更好的用户体验

## 优雅降级

- 一开始就针对高级浏览器构建完整的功能，然后再针对低版本浏览器进行兼容做功能降级。

## 页面导入样式时，使用 link 和 @import 有什么区别？

```
（1）从属关系区别。 @import 是 CSS 提供的语法规则，只有导入样式表的作用；link 是 HTML 提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性、引入网站图标等。

（2）加载顺序区别。加载页面时，link 标签引入的 CSS 被同时加载；@import 引入的 CSS 将在页面加载完毕后被加载。

（3）兼容性区别。@import 是 CSS2.1 才有的语法，故只可在 IE5+ 才能识别；link 标签作为 HTML 元素，不存在兼容性问题。

（4）DOM 可控性区别。可以通过 JS 操作 DOM ，插入 link 标签来改变样式；由于 DOM 方法是基于文档的，无法使用 @import 的方式插入样式。
```

- offsetWidth 水平方向 width + 左右 padding + 左右 border-width
- offsetHeight 垂直方向 height + 上下 padding + 上下 border-width

- clientWidth 水平方向 width + 左右 padding
- clientHeight 垂直方向 height + 上下 padding

- offsetTop 获取当前元素到 定位父节点 的 top 方向的距离
- offsetLeft 获取当前元素到 定位父节点 的 left 方向的距离

- scrollWidth 元素内容真实的宽度，内容不超出盒子高度时为盒子的 clientWidth
- scrollHeight 元素内容真实的高度，内容不超出盒子高度时为盒子的 clientHeight

## css reset 和 css normalize 是什么？

reset 是暴力清除标签默认样式，比如 \* {margin:0; padding: 0}，normalize 保留默认样式，仅修复样式在不同浏览器上的差异。个人见解：理论上 normalize 更好，实际选择中其实差别不大。

## 清除浮动

```
 .clearfix:after{
     content: '';
     display: block; /*或者 table*/
     clear: both;
 }
 .clearfix{
     zoom: 1; /* IE 兼容*/
 }
```

## 浏览器是如何判断元素是否匹配某个 CSS 选择器？

CSS 选择器的匹配算法是从右到左。 （联想二叉树匹配）

## inline 和 inline-block 的区别

inline 宽度收缩，inline 元素设置宽高无效，设置上下 margin 无效，设置上下 padding 可用来撑开背景但不占用普通流空间，设置左右 margin 和 padding 有效。 可以给父级的块级元素设置 text-align: center 来水平居中。
inline-block 宽度收缩，宽高设置有效，上下 margin、padding 设置有效。可以给父级的块级元素设置 text-align: center 来水平居中。

## 为什么提倡使用 translate() 而非 不是 absolute？

translate 能让浏览器调用显卡而不是 CPU 进行计算渲染，动画性能更好，页面不卡。

## 如果实现一个高性能的 CSS 动画效果？

尽可能使用 CSS3 过渡和动画，比如 transition+transfrom，或者@keyframes + animation
如果用 js，尽量使用 requestAnimationFrame。
