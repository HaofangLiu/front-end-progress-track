# 文档流：

## 宽度：

* 永远不要写宽度100%

* block（div）默认能有多宽有多宽 ｜ div width默认宽度是auto（！不是100%）

* inline宽度默认是inline的和

* 经验： 不要在inline里面写block

* inline-block结合两个的特点.可用width


## 高度：

* inline 高度是由line-height间接确定的，跟height无关

* block 高度跟内部文档流元素决定的，可以设定height

* inline-block 跟 block类似，可以设置height


## 脱离文档流
* float
* position:absolute/fixed


# 布局
* 960 / 1000 / 1024

## float 布局
* 子元素float设置float:left/right,并且给width

* 父元素.`clearfix{content: '';display:block;clear:both}`

* 假如图片下面有多余的东西，可以用`vertical-align:top` 或者`vertical-align:middle` 去消除

* border会影响时可以用outline

* (如果是块级元素而且宽度固定)居中：margin：0 auto -> 最好替换为margin-left margin-right: auto

* float的平均布局可以用负margin来解决换行问题

## flex布局
`display:flex`

### container
flex-direction row|row-reverse|column|column-reverse
flex-wrap nowrap|wrap|wrap-reverse
justify-content flex-start|flex-end|center|space-between|space-around|space-evenly
align-items flex-start|flex-end|center|stretch|baseline
align-content flex-start|flex-end|center|stretch|space-between|space-around


### item
*  order item排列顺序，默认是0，负数在前面，正数在后面
*  flex-grow: 将多余的空间分配给item（变胖）
*  flex-shrink 控制如何变瘦，在空间不够时如何缩小。默认是1，可以给0来防止item变小
*  flex-basis （理解为宽度）控制基准宽度，默认是auto
*  align-self 自己这个item怎么对齐


## grid布局
`display:grid`

### container
grid-template-columns: 10px auto 10px
grid-template-rows:25% auto 100px

也可以用fr去等分份数

grid-template是grid-template-rows和grid-template-columns的缩写形式。

比如说，grid-template: 50% 50% / 200px;将创建一个具有两行的网格，每一行占据50%，以及一个200像素宽的列。

grid-template-areas: ” header header header“
"aside main ad"
"footer footer footer"

用grid-area去指定所对应的区域

row/column-gap 行/列间隔

### item
grid-column-start
grid-column-end
(grid-column:可接受两个值，相当于上面两行，需要用/分开)
grid-row-start
grid-row-end
(grid-row同理)
后面接收的都是第几根线

grid-area属性接受4个由'/'分开的值：grid-row-start, grid-column-start, grid-row-end, 最后是grid-column-end。

# 选择器

## 元素选择器(标签选择器)
`a{ text-decoration:none }`
`body{ font-size:14px }`

## id选择器
`#id{border:1px solid black}`

## 类选择器
`.active{color:red}`

## 通用选择器
`* {margin:0; padding:0}`

## 属性选择器
* [attr]选择包含 attr 属性的所有元素，不论 attr 的值为何。
* [attr=val] 仅选择 attr 属性被赋值为 val 的所有元素。
```css
[disabled] {
border: 1px solid #ccc;
}
[data-color=“gray”] {
color: #666;
}
```

## 组合选择
1. 逗号，同时选中
`.a,.b{ color:red }`
2. 空格 A  B 选择A的后代B元素（没有空格时则同时具备两个，p.className）
`ul li {color:red}`
3. 大于号  A > B 选中A的直接B子元素
`ul > li {color:red}`
4. 加号 A + B      A的下一个邻居（平级关系）
`target + li{ }`
5. 波浪号 A ~ B    A的所有B邻居
`target ~ li{ }`

### 伪类:(节点特殊的状态)
:link :visited :hover :active
:focus :root(选中根结点) :checked :disabled
:target(代表一个唯一的页面元素(目标元素)，其id 与当前URL片段匹配 .) :not

### 伪元素::
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


white-space:nowrap文字不换行

### 优先级顺序
!important > 内联样式> 选择器设置样式 > 浏览器默认样式 > 继承样式

对于同一级别的样式，比如都带有!important 则比较选择器权重

color: inherit 当前元素使用继承自父亲的 color，不管父亲是否设置了color属性。
color: initial 当前元素使用初始值，对于a链接来说初始值是黑色，而不是浏览器的默认样式蓝色
color: unset 如果是继承属性则继承父级，如果是非继承属性就用initial value

# 外边距合并
* 只有块级元素外边距才会产生合并，内联元素和inline-block元素不会
* 外边距合并只限于上下外边距，左右外边距不会合并
* 加边框、加padding、里面添加行内内容、创建块级格式化上下文等方法都可以阻止父子外边距合并

width: 100%，在标准盒模型下当前元素的content的宽度等于父亲的content宽度
width: 100%，在IE盒模型下当前元素的content+padding+border的总宽度等于父亲的content宽度

height: 100%, 表示当前元素的content的高度等于父亲content的高度
如果父元素没有设置height属性，给子元素设置height:100%也是无效的
想让当前元素撑满屏幕，一直方法是给当前元素、上一级、上上级...直到html标签全都设置 height: 100%


# 浏览器渲染原理

* 根据HTML创建HTML树（DOM树）
* 根据CSS创建CSS树（CSSOM）
* 将两个树合并为一个树（render tree）
* Layout布局（文档流，盒模型，计算大小和面积）
* Pain绘制（绘制边框颜色，文字颜色，绘画阴影等）
* Compose合成（根据层叠关系展示页面）

* 小技巧：可以利用 [csstriggers.com](https://csstriggers.com/) 去验证重绘等行为

# transform

* 常用功能：translate, scale,rotate, skew
* 小技巧： 绝对定位元素的垂直居中； translate(-50%,-50%)

# transition

* transition: 属性名，时长，过渡方式，延迟
* 可以用 all 去代表所有属性

# 动画帧 @keyframs

* 写法1: 
```css
@keyframs xxx{
    0%{}
    30%{}
    100%{}
}
```

* 写法2： 
```css
@keyframs xxx{
    from{}
    to{}
}
```

* 用法： animation: 时长 ｜ 过渡方式 ｜ 延迟 ｜ 次数 ｜ 方向 ｜ 填充模式 ｜ 是否暂停 ｜ 动画名