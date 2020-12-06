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
flex-direction
flex-wrap
justify-content
align-items


### item
*  order item排列顺序
*  flex-grow: 将多余的空间分配给item（变胖）
*  flex-shrink 控制如何变瘦，在空间不够时如何缩小。默认是1，可以给0来防止item变小
*  flex-basis （理解为宽度）控制基准宽度，默认是auto
*  align-self 自己这个item怎么对齐


# 选择器

`xxx:first-child`
`xxx:nth-child(2)`
`xxx:last-child`
