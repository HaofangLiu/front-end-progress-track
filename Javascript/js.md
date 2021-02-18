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
* 结论： 尽量link标签放在head内部，防止出现FOUC。但是可以通过处理防止FOUC

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
