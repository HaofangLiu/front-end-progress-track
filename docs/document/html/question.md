# Question
## DTD的作用是什么？什么是怪异模式？什么是标准模式？二者有什么差别（举例）？产生的历史原因是什么？使用时需要注意什么？
DTD 是Doc Type Declaration， 对于HTML和XHTML， 添加文档对象声明能够确保不同浏览器使用相同的方式解析页面。不设置DocType或者错误设置会触发怪异模式。 在HTML顶部添加 `<!DOCTYPE html>` 就是使用标准模式

怪异模式下不同的浏览器的渲染模式是不一样的，就导致开发者需要花费大量精力在不同浏览器的一致性上。 而标准模式浏览器的一致性好得多。

举例，css的盒模型。微软在IE5时与IE6的盒模型不一致。盒模型的宽度不等于内容加上内边距。 所以可以用DTD来控制怎么显示盒模型

使用时需注意： `<!DOCTYPE html>` 必须放在顶部，前面不能有其他的字符。 可以使用`document.compatMode` 来检测

## HTML5是什么？有哪些新特性？新增了哪些语义化标签？新增了哪些表单元素？和h5有啥关系？
HTML5 是HTML第五次修订版。 广义上叫Web开发技术集。 
- 语义化标签： section article nav header footer main audio video figure
- 新的通信技术： Websocket， 服务器推送， WebRTC
- 离线存储： LocalStorage ， indexedDB等
- 多媒体。 音视频， WebRTC， 摄像头等
- 2/3D绘画。 Canvas， WebGL， SVG
- 性能。 WebWorkers， xhr2， 动画， History API
- 设备访问。Camera API， 触控，位置，设备方向
- 样式  CSS3阴影、边框、动画、形变、过渡、布局
- 新增表单元素 type=email、search、range、color、date、url、number

## 如何理解HTML语义化 ？ 
关键点： 合适的标签， 合适的命名

## meta viewport作用？
让页面能够在小屏幕下合理的显示
`<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1">`

最大缩放是1， 最小缩放也是1，也就是没办法使用手指来拉伸

## HTML和XHTML的区别
XHTML标签必须闭合， HTML可以省略闭合。
HTML表单的属性可以不设置值。 比如`<input type="radio" selected>` XHTML表单属性必须设置值 `<input type="radio" selected="selected">`
HTML标签和属性忽略大小写， 在XHTML标签和属性只能小写

## 使用 data-* 属性有什么用？
可以暂存数据， node.dataset可以获取data-属性构造的对象。比如
`<div id="node" data-color="red" data-font-size="30px">jirengu</div>
Object.assign(node.style, node.dataset)`

## `<script>`、`<script async>` 和 `<script defer>` 的区别。
- `<script>`加载->执行->往后解析；加载会阻塞解析，多个JS按顺序执行

浏览器碰到script标签会停止，阻塞解析，当执行完js后才会继续写解析。 
- `<script async>` 不影响DOM的解析和其他资源的加载，特例独行，不保证顺序，不保证时机
- `<script defer>` 不影响DOM的解析和其他资源的加载，但是会保证在DOM资源准备就绪后再执行，并且对于多个defer的外置js按顺序执行

## 白屏和FOUC是什么？为什么通常推荐将 CSS `<link>` 放置在 `<head></head>` 之间，而将 JS `<script>` 放置在 `</body>`之前？有没有例外的情况？

白屏： 页面一片空白，突然展示完整的有样式的内容

FOUC：无样式内容闪烁，页面一开始展示无样式的内容，突然样式正常

样式的加载不会阻塞后续元素的解析，所以当然是加载的越早越好。并且能防止部分浏览器出现无样式内容闪烁的效果。

JS的加载会阻塞后续DOM的解析，放在后面可以让用户第一时间看见页面体验更好。而且一般js常常会操作DOM，如果放在head里此时body上的dom元素尚未解析，只能监听事件再合适的时机再操作dom多此一举。

有些场景下比如需要尽早的做一些事情，比如移动端适配时修改html的fontsize，此时可以放在head中越早越好。

## 浏览器渲染机制？什么是回流(reflow)、重绘(repaint)？
解析HTML，构建DOM树；解析CSS构建CSSOM树；组合成渲染树；计算节点的位置和几何结构；绘制到屏幕上。

回流：重新计算元素的几何尺寸，位置。添加删除元素，修改盒模型属性，display: none等，引起自己尺寸、位置变化或者其他元素尺寸位置的变化。

重绘：重新绘制全部或者部分界面。修改颜色、背景色等。不需要重新计算位置，只需要重新绘制效果。

优化：一次性修改样式；给动画使用绝对定位或者transfrom减小影响面；在DOM离线状态下修改样式。

