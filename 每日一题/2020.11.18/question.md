[html] 使用svg画出“前端每日3+1”的几个字
[css] css中如何获取dpr值？
[js] 请解释下为什么我们可以在声明函数前使用它？
[软技能] 在https站点下如何加载http的资源文件？

https与http的区别：

https协议需要到ca申请证书，一般免费证书很少，需要交费。
http是超文本传输协议，信息是明文传输，https 则是具有安全性的ssl加密传输协议。
http和https使用的是完全不同的连接方式用的端口也不一样,前者是80,后者是443。
http的连接很简单,是无状态的。
HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议 要比http协议安全。


解决办法：
相对协议
如果你的网站同时准备了https资源和http资源，那么使用相对协议可以实现根据当前网站的协议，浏览器自行选择通过https还是http发起请求，而相对协议也是非常简单的就是讲URL的协议(http、https)去掉。<img src="//domain.com/img/logo.png">
