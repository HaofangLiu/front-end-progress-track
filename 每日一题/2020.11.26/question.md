[html] 一个标签上同时出现三个或多个class属性，请问它的渲染顺序是怎样的？
[css] 移动端开发时你了解淘宝的lib-flexible方案吗？它的原理是什么？
[js] 一个好的算法都应包含哪些要素？
[软技能] 说说纯前端目前还有哪些做不到的需求？为什么？

淘宝实用lib-flexible来适配各种大小的屏幕

先来了解一点关于viewport的知识，通常我们采用如下代码设置viewport:<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

这样整个网页在设备内显示时的页面宽度就会等于设备逻辑像素大小，也就是device-width。这个device-width的计算公式为：

设备的物理分辨率/(devicePixelRatio * scale)，在scale为1的情况下，device-width = 设备的物理分辨率/devicePixelRatio 。

devicePixelRatio称为设备像素比，每款设备的devicePixelRatio都是已知，并且不变的，目前高清屏，普遍都是2，不过还有更高的，比如2.5, 3 等

淘宝触屏版布局的前提就是viewport的scale根据devicePixelRatio动态设置：

这么做目的当然是为了保证页面的大小与设计稿保持一致了，
比如设计稿如果是750的横向分辨率，那么实际页面的device-width，以iphone6来说，也等于750，这样的话设计稿上标注的尺寸只要除以某一个值就能够转换为rem了。通过js设置viewport的方法如下：

接下来要解决的问题是，元素的尺寸该如何计算，比如说设计稿上某一个元素的宽为150px，换算成rem应该怎么算呢？这个值等于设计稿标注尺寸/该设计稿对应的html的font-size。拿淘宝来说的，他们用的设计稿是750的，所以html的font-size就是75，如果某个元素时150px的宽，换算成rem就是150 / 75 = 2rem。总结下淘宝的这些做法：
最
后还有一个情况要说明，跟网易一样，淘宝也设置了一个临界点，当设备竖着时横向物理分辨率大于1080时，html的font-size就不会变化了，原因也是一样的，分辨率已经可以去访问电脑版页面了。


