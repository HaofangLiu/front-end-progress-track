[html] 如何动态修改<title>的标题名称？
[css] 说说你对 css 变量（自定义属性）的理解？
[js] 你是如何做前端性能分析的？从哪些方面入手？有哪些指标？
[软技能] 你是如何评估工作量的？

1.  我们应该使用 document.title 方法通过 DOM 操作来修改 title 的值

2.  自定义属性（有时候也被称作 CSS 变量或者级联变量）是由 CSS 作者定义的，它包含的值可以在整个文档中重复使用。由自定义属性标记设定值（比如： --main-color: black;），由 var() 函数来获取值（比如： color: var(--main-color);）
    复杂的网站都会有大量的 CSS 代码，通常也会有许多重复的值。举个例子，同样一个颜色值可能在成千上百个地方被使用到，如果这个值发生了变化，需要全局搜索并且一个一个替换（很麻烦哎～）。自定义属性在某个地方存储一个值，然后在其他许多地方引用它。另一个好处是语义化的标识。比如，--main-text-color 会比 #00ff00 更易理解，尤其是这个颜色值在其他上下文中也被使用到。
    自定义属性受级联的约束，并从其父级继承其值。

注意，规则集所指定的选择器定义了自定义属性的可见作用域。通常的最佳实践是定义在根伪类 :root 下，这样就可以在 HTML 文档的任何地方访问到它了：

:root {
--main-bg-color: brown;
}

如前所述，使用一个局部变量时用 var() 函数包裹以表示一个合法的属性值：

element {
background-color: var(--main-bg-color);
}


3.  一、影响网页性能的因素
HTML 的解析和渲染（参见文档 《浏览器解析渲染HTML页面的过程》）
服务端处理的速度（负载均衡，缓存策略）
客户端带宽（网络状况）
我们要对网页的性能进行统计分析，首先应当确定哪些因素会对网页的性能带来影响。一般来说，前端HTML文档的结构是否合理，外部资源是否进行了压缩合并，静态内容是否使用了CDN加速，服务端是否配置了负载均衡，是否采取了缓存策略，以及客户端带宽状况等，都会对网页的性能造成影响。

二、浏览器解析渲染HTML页面的过程
参考资料： 浏览器的工作原理

上面这篇文章会帮助我们了解浏览器解析和渲染HTML文档的过程。具体的可以参见另一篇文档： 《浏览器解析渲染HTML页面的过程》

这里对以下几点进行着重说明：

HTML 文档的解析和渲染是一个渐进的过程。为达到更好的用户体验，呈现引擎会力求尽快将内容显示在屏幕上。它不必等到整个 HTML 文档解析完毕，就会开始构建呈现树和设置布局。在不断接收和处理来自网络的其余内容的同时，呈现引擎会将部分内容解析并显示出来。
浏览器的预解析机制。
HTML 文档的解析和渲染过程中，外部样式表和脚本顺序执行、并发加载。
JS 脚本会阻塞 HTML 文档的解析，包括 DOM 树的构建和渲染树的构建；CSS 样式表会阻塞渲染树的构建，但 DOM 树依然继续构建（除非遇到 script 标签且 css 文件此时仍未加载完成），但不会渲染绘制到页面上。
在 HTML 文档的解析过程中，解析器遇到 <script> 标记时会立即解析并执行脚本，HTML 文档的解析将被阻塞，直到脚本执行完毕。如果脚本是外部的，那么解析过程会停止，直到从网络抓取资源并解析和执行完成后，再继续解析后续内容。
但无论是哪种情况导致的阻塞，该加载的外部资源还是会加载，例如外部脚本、样式表和图片。HTML 文档的解析可能会被阻塞，但外部资源的加载不会被阻塞。

三、浏览器并发连接数
Chrome: Browser only allows six TCP connections per origin on HTTP 1.
Chrome 浏览器的并发连接数为 6 个，超过限制数目的请求会被阻塞。

参见《浏览器解析渲染HTML页面的过程》的 “CSS 和 JS 的处理顺序和阻塞分析”一节。

四、Performance API
能够实现对网页性能的监控，主要是依靠 Performance API。

《JavaScript 标准参考教程（alpha）》
MDN文档
重点查看以下方法：

Performance.timing
Performance.getEntries()
Performance.getEntriesByType()
Performance.now()
尤其是第一项，可以在控制台输出查看一下。

五、localStorage
Web Storage API
calculating-usage-of-localstorage-space
localStorage 的基本概念和使用方法可以参见上面的链接，包括测试本地存储是否已被填充、从存储中获取值、在存储中设置值、删除数据记录、浏览器兼容性、通过 StorageEvent 响应存储的变化等。

localStorage 的大小限制
浏览器对于 localStorage 存储数据的大小有限制，一般为 5M/域，因此开发时应该注意控制存数数据的大小，并定期清除过期和无用的数据。

当 localStorage 存储超限的时候，会报 Uncaught QuotaExceededError 错误。

// 当存储数据大小超过限制时，会报以下错误：
// `YourStorageKey` 指报错时存放数据的键值
Uncaught QuotaExceededError: Failed to set the 'YourStorageKey' property on 'Storage': Setting the value of 'YourStorageKey' exceeded the quota.
我们可以使用 try-catch 对数据存储操作进行包裹，当捕获数据超限的错误时，我们可以先清除旧数据再进行存储。

// 存储 xhr 信息到客户端 localStorage 中
wp.setItemToLocalStorage = function (xhr) {
    var arrayObjectLocal = this.getItemFromLocalStorage();
    if (arrayObjectLocal && Array.isArray(arrayObjectLocal)) {
        arrayObjectLocal.push(xhr);
        try {
            localStorage.setItem('webperformance', JSON.stringify(arrayObjectLocal));
        } catch (e) {
            if (e.name == 'QuotaExceededError') {
            // 如果 localStorage 超限, 移除我们设置的数据, 不再存储
            localStorage.removeItem('webperformance');
            }
        }
    }
};
数据格式
localStorage 只能存储字符串类型的数据，不能够直接存储数组或对象。但我们可以通过 JSON.stringify() 和 JSON.parse() 实现对数组和对象数据类型的存取.

localStorage.setItem('webperformance', JSON.stringify(arrayObjectLocal));
var arrayObjectLocal = JSON.parse(localStorage.getItem('webperformance')) || [];
网页性能指标
一、页面性能指标
白屏时间
读取页面首字节时间（ttfb - Time To First Byte），可以理解为用户拿到页面资源占用的时间。
浏览器对html文档的解析和渲染是一个渐进的过程，一般在拿到首字节之后便会有内容绘制在页面上，正常网络状态下基本上白屏时间很短。
资源加载
浏览器在接收到服务器返回的 html 文档数据之后，会起一系列的线程去请求文档解析中遇到的各种资源，js脚本、CSS样式表、图片，以及发起异步请求。我们这里的资源认为是 js/css/图片，后面统计资源加载情况时，会统计这些资源的文件大小、文件数量、总的加载用时。ajax异步请求我们会另外进行统计。
用户可操作时间
在查阅相关资料时，会看到用户等待页面时间、用户可操作时间等概念，不同资料和文章的定义也不同，这里我们认为用户可操作时间就是用户可以进行页面操作的时间，此时 html 文档解析完成（domContentLoadedEventEnd）。另一种用户等待页面的时间，一般是按照页面加载完成的时间来统计（loadEventEnd）。但在我们这次的前端性能监控方案中，并不将其作为主要的监控指标。
首屏渲染时间
首屏时间的统计比较复杂，因为涉及图片资源的下载及异步请求等因素。有些资料统计中不计算图片的下载时间，但我们认为既然是首屏的展示，应当包括图片加载的完成。判断首屏图片加载完成的方法，这里不再详述，可以查阅相关文章。我们这次的前端性能分析方案中，并没有涉及到图片，而是关注页面初始化过程中的异步请求。
二、ajax 请求性能指标
服务器处理时间
客户端下载时间
接口名称
下载速度
页面路径及id
传输大小