# 网络

## OSI 七层模型

- 物理层：底层数据传输，如网线；网卡标准.
- 数据链路层：定义数据的基本格式，如何传输，如何标识；如网卡 MAC 地址.交换机就处在这一层
- 网络层：定义 IP 编址，定义路由功能；如不同设备的数据转发.
- 传输层：端到端传输数据的基本功能；如 TCP、UDP.
- 会话层：控制应用程序之间会话能力；如不同软件数据分发给不同软件. 比如 DNS
- 表示层：数据格式标识，基本压缩加密功能.
- 应用层：各种应用软件，包括 Web 应用.

# HTTP

## 应用层协议 vs 传输层协议

- 应用层协议 POP3 HTTP
- 传输层协议 TCP UDP

## 关于 TCP 协议

- TCP（Transmission Control Protocol， 传输控制协议）是一种面向连接的、可靠的、基于字节流的传输层通信协议。与之对应的是 UDP（User Datagram Protocol ，用户数据报协议），是不可靠的传输层协议。

## TCP 报文格式

![tcp image](./tcp.png)

- ACK ： TCP 协议规定，只有 ACK=1 时有效，也规定连接建立后所有发送的报文的 ACK 必须为 1。
- SYN(SYNchronization) ： 在连接建立时用来同步序号。当 SYN=1 而 ACK=0 时，表明这是一个连接请求报文。对方若同意建立连接，则应在响应报文中使 SYN=1 和 ACK=1. 因此, SYN 置 1 就表示这是一个连接请求或连接接受报文。
- FIN （finis）即完，终结的意思， 用来释放一个连接。当 FIN = 1 时，表明此报文段的发送方的数据已经发送完毕，并要求释放连接。
  example
- 报文 1: [ACK=0，SYN=1, seq=123] 这是询问报文，询问号是 123
- 报文 2: [ACK=1，SYN=1, seq=234, ack=124] 这是应答+询问报文，对 seq 为 123 的报文进行应答。询问下一个报文，询问号是 234
- 报文 3:[ACK=1, SYN=0, seq=124, ack=235] 这是应答报文，对 seq 为 234 的报文进行应答

## 三步握手

![三步握手真实截图](./2.png)

可以想象两人用对讲机交谈。
A：Are you ok? （SYN=1，seq=100 ）
B：I am fine. And you? (ACK=1, ack=101. SYN=1, seq=200)
A：Me too. (ACK=1, ack=201)

![三步握手示意图](./3.png)

- 客户端发送 SYN=1 的询问报文给服务器端，seq 是 n，进入 SYN_SENT 状态。
- 服务器端回应一个 ACK=1、SYN=1 的应答+询问报文。应答号 ack 是 n+1，询问号 seq 是 m，进入 SYN_RCVD 状态。
- 客户端收到后，回应一个 ACK=1 的应答报文，应答号是 m+1，进入 Established 状态。

### 为什么不能是两步？

- 第一次握手：客户端发送网络包，服务端收到了。这样服务端就能得出结论：客户端的发送能力、服务端的接收能力是正常的。
- 第二次握手：服务端发包，客户端收到了。这样客户端就能得出结论：服务端的接收、发送能力，客户端的接收、发送能力是正常的。不过此时服务器并不能确认客户端的接收能力是否正常。
- 第三次握手：客户端发包，服务端收到了。这样服务端就能得出结论：客户端的接收、发送能力正常，服务器自己的发送、接收能力也正常。

## 四次挥手

- 客户端打算关闭连接，此时会发送一个 TCP 首部 FIN 标志位被置为 1 的报文，也即 FIN 报文，之后客户端进入 FIN_WAIT_1 状态。
- 服务端收到该报文后，就向客户端发送 ACK 应答报文，接着服务端进入 CLOSED_WAIT 状态。客户端收到服务端的 ACK 应答报文后，之后进入 FIN_WAIT_2 状态。
- 等待服务端处理完数据后，也向客户端发送 FIN 报文，之后服务端进入 LAST_ACK 状态。
- 客户端收到服务端的 FIN 报文后，回一个 ACK 应答报文，之后进入 TIME_WAIT 状态- 服务器收到了 ACK 应答报文后，就进入了 CLOSE 状态，至此服务端已经完成连接的关闭。
- 客户端在经过 2MSL 一段时间后，自动进入 CLOSE 状态，至此客户端也完成连接的关闭。

这里一点需要注意是：主动关闭连接的，才有 TIME_WAIT 状态。

- 要确保服务器是否已经收到了我们的 ACK 报文，如果没有收到的话，服务器会重新发 FIN 报文给客户端，客户端再次收到 FIN 报文之后，就知道之前的 ACK 报文丢失了，然后再次发送 ACK 报文。

- 关闭连接时，客户端向服务端发送 FIN 时，仅仅表示客户端不再发送数据了但是还能接收数据。服务器收到客户端的 FIN 报文时，先回一个 ACK 应答报文，而服务端可能还有数据需要处理和发送，等服务端不再发送数据时，才发送 FIN 报文给客户端来表示同意现在关闭连接。

TCP 挥手可以只需要三次吗？
可以的。

- 因为服务器端收到客户端的 FIN 后，服务器端同时也要关闭连接，这样就可以把 ACK 和 FIN 合并到一起发送，节省了一个包，变成了“三次挥手”。

## 状态码

- 1xx 信息响应 100 need continue
- 2xx 成功响应
- 3xx 重定向
- 4xx 客户端错误
- 5xx 服务端响应

200 success

201 请求成功，并因此创建了一个资源， 通常是 POST，或者某些 PUT

206 部分成功， 类似断点续传

301 被请求的资源已经永久移动到新的位置， 如果可能返回新的地址

302 Found 请求的资源现在临时从不同的 URI 响应请求。

304 Not Modified 如果发送了一个带条件的 GET 请求， 而文档内容自上次访问没有改变， 则服务器会返回这个状态码。

305 User Proxy 被请求的资源必须通过指定的代理才能被访问

400 Bad Request 语义有误、参数有误

401 unauthorized 当前请求需要用户验证。响应要带一个 cookie/session 来询问用户的信息

403 forbidden 服务器理解请求，但拒绝执行。

404 Not Found 请求失败，没有在服务器上找到资源

405 method not allowed 请求中指定的方法不能被用于请求相应的资源

500 Internal server error 服务器遇到了不知道如何处理的情况

501 not implemented 服务器不支持当前请求所需要的某个功能

502 Bad Gateway 作为网关或者代理工作的服务器尝试执行请求时，从上游服务器收到无效的响应

503 service unavailable 服务器没有准备好处理请求， 常见原因是服务器因维护或重载停机

504 Gateway Timeout 当服务器作为网关， 不能及时响应时返回这个代码

505 HTTP Version Not supported 服务器不支持请求中所使用的 http 协议版本

## HTTP 报文

### 请求、响应报文应该由以下内容组成：

- 请求行，例如：GET /logo.gif HTTP/1.1 或状态码行，例如：HTTP/1.1 200 OK，
- HTTP 头字段
- 空行
- 可选的 HTTP 报文主体数据

```
// 响应样例
POST /auth/login HTTP/1.1
Host: blog-server.hunger-valley.com
Connection: keep-alive
Content-Length: 41
Accept: application/json, text/plain, */*
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imh1bmdlciIsImlkIjoxLCJpYXQiOjE2MTExMjc1MjMsImV4cCI6MTYxMTM4NjcyM30.U-CkNW7WU0zprsjI23eK-0TE5wS_gD-2ZTFW8wE31FU
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36
Content-Type: application/json;charset=UTF-8
Origin: https://jirengu-inc.github.io
Referer: https://jirengu-inc.github.io/
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
{"username":"hunger","password":"123456"}
```

```
// 请求案例
HTTP/1.1 200 OK
Server: nginx/1.4.6 (Ubuntu)
Date: Wed, 20 Jan 2021 07:28:09 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 406
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, PUT, POST, DELETE, PATCH, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
ETag: W/"196-Ay8U/71Rt0EbDzvYIuK2YtXe7xE"
{"status":"ok","msg":"登录成功","data":{"id":1,"username":"hunger","avatar":"https://avatars.dicebear.com/api/human/hunger.svg?mood[]=happy","createdAt":"2020-09-17T03:03:55.803Z","updatedAt":"2020-09-17T03:03:55.803Z"},"token":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imh1bmdlciIsImlkIjoxLCJpYXQiOjE2MTExMjc2ODksImV4cCI6MTYxMTM4Njg4OX0.dcO4DTvWAVYPPL5do3j9zyfa48-69j157iAiXae5yrw"}
```

请求报文首部字段的作用是说明： 我是谁，我有哪些信息，我希望对方给我什么
响应报文首部字段的作用是说明：我的内容是什么，你要做什么，给你什么

- Host：请求首部，我当前请求的域名是什么
- Connection： 通用（请求和响应都用到）首部，我们之间用怎样的连接方式，常用值 keep-alive
- Content-Type：通用首部，我的报文内容的数据格式是什么
- Origin： 请求首部，我这个请求是哪个页面的域名发出来的
- Referer： 请求首部，发出我这个请求的页面是从哪个链接跳转进来的
- Accept：请求首部，我接收哪些类型的数据
- User-Agent: 请求首部， 发我这个请求的浏览器信息是什么
- Access-Control-Allow-Origin：响应首部， 我(服务器)允许来自哪些域名的页面能接收数据
- If-Modified-Since： 请求首部，这个资源上次修改的时间是这个时间，服务器你看看过期了没，过期了就给我新资源，没过期就给我发 304
- If-None-Match: 请求首部，这个资源的 tag 是这个编号，服务器你看看你存储的这个资源有没有修改过，如果修改过就给我发新资源，没修改过就发 304
- Etag：响应首部， 我（服务器）给你的这个资源的编号是这个，你存起来
- Last-Modified： 响应首部， 我（服务器）给你的这个资源的修改时间是这个，你存起来，下次要的时候把这个日期带给我
- Cache-Control：通用首部， 资源本地缓存的时间由这个控制
- Authorization：请求首部，这是我的身份信息，服务器你收到后验证一下
- Cookie：请求首部，这是我的 cookie，服务器你收到后 u 验证一下
- Set-Cookie：响应首部，我是服务器，要把 cookie 设置到浏览器
- Location：响应首部， 我是服务器， 客户端你看到 301 和 302 的状态码就做跳转吧，这是你要跳转的地址

## 聊一聊浏览器的缓存机制？（HTTP 是如何控制缓存的）

浏览器第一次向服务器发请求获取资源，服务器响应报文的状态码是 200，响应头会带上 Cache-Control、Etag 字段，响应体是原始资源。浏览器收到响应后把资源缓存在本地。
当浏览器再次发送请求获取该资源时，浏览器先检查该资源是否过期（通过之前响应报文的 Cache-Control:max-age=过期时间来判断）。如果在过期时间以内，直接使用该资源。
如果时间过期，则发请求询问该资源是否依旧可用。请求包含头字段 If-None-Match ，是之前响应报文里的 Etag。

服务器收到请求后通过 If-None-Match 里的 Etag 和新计算的 Etag 做对比，如果匹配，则直接返回一个状态码为 304，不包含响应体的报文，告诉浏览器该资源依旧可用。如果不匹配，则返回一个状态码为 200 带 Cache-Control、Etag 和原始资源的新报文。

如果不存在 Etag，则用 Last-Modified 和 If-Modified-Since 做类似的判断。

### Last-Modified、If-Modified-Since 字段有什么作用？

当浏览器向服务器请求资源，服务器给出响应时会带上资源的修改时间，如 last-modified: Fri, 16 Oct 2020 04:15:40 GMT 。浏览器下次向服务器请求该图片时会带上 if-modified-since: Fri, 16 Oct 2020 04:15:40 GMT 。服务器可根据请求的文件修改时间和真实的文件修改时间做比较，来判断资源是否过期。

### Etag 和 If-None-Match 字段有什么作用？

Etag 相当于给资源打个标记生成“独一无二”的指纹。当文件在服务端被修改时，Etag 就会改变。其作用和 Last-Modify 类似。在现实环境中，这个独一无二并不严谨。

### Last-Modified 和 Etag 哪个更好？

二者作用一样，大多数服务器生成 Etag 就是由 “文件的修改时间”和“资源的长度”两个因子生成。当然还有一些细微的差异。第一，Last-Modified 的单位是秒，如果在一秒内对文件进行修改，使用 Last-Modified 不变，但 Etag 一般会发生改变。第二，二者在语义上也有差异，一个是文件的修改时间，一个是文件的指纹。第三，使用 Last-Modified，浏览器端可以直接看到文件的修改时间，对服务器来说这个信息的暴露是画蛇添足的。

### Expires 字段是什么意思？

这是 HTTP1.0 版本的报文字段，代表资源的过期时间，如 Expires: Wed, 21 Oct 2021 07:28:00 GMT 。如果设置了 Cache-control: max-age=过期秒数，Expires 会被忽略。

### Expires 和 Cache-Control 有什么区别？

第一，Expires 的值是一个 GMT 的时间点，代表到什么时间点过期；Cache-Control: max-age=值 这个值是一个以秒为单位的时间段，代表有效期是多少秒。第二，Cache-Control 还能设置更复杂的场景，比如 Cache-Control: no-cache、no-store、private 等。第三，如果服务器告诉所有的浏览器某资源在 2022 年 1 月 1 日到期，到了该时间点时需要该资源的浏览器都会在同一时间发请求。而如果服务器告诉所有浏览器某资源在各自存储 100 天，因为第一次请求的时间不一样，再次需要该资源的浏览器不会同时发请求。

### Cache-Control: max-age=3600 是什么意思？

服务器告诉浏览器，这个资源在本地缓存下来，如果再次需要该资源并且是在 3600 秒以内，不要发请求直接使用这个资源。如果超出 3600 秒，再发请求向服务器询问是否能继续使用。

### Cache-Control: no-cache 是什么意思？

告诉浏览器，收到这个资源先缓存下来，下次需要该资源时不要立即使用，而是先向服务器确认该资源的有效性，再使用。等同于 max-age=0。

### Cache-Control: no-store 是什么意思？

告诉浏览器，收到资源不要存储。下次需要该资源时直接发请求，服务器给你最新的。

### Cache-Control: private、public 分别是什么意思？

private 是告诉中间的代理服务器不要缓存资源，只让目标浏览器缓存。public 是都能缓存。

### Cache-Control: no-cache 和 Cache-Control: no-store 有什么区别？

一个收到存下来不直接用，再次确认后再用。 一个是完全不存。

### connection: keep-alive

HTTP 1.0 存在问题： 建立的一次连接，只有包含一个请求响应（对应一个资源）

HTTP1.1

- 改进 1: 连接可以复用。一次连接，多个请求响应（对应多个资源）
- 改进 2：增加流水线（pipeline）操作。下一个请求可不用等上一个响应来之后再发送。（但响应到来的顺序不变 FIFO）

- http1.1 中默认开启，通过 http 请求头设置“connection: close”关闭。
- http1.0 默认是关闭的，通过 http 请求头设置“connection: keep-alive”进行开启

依旧存在的问题：

1. 请求按次序，后来者需要排队等待
2. 请求头都类似，重复传输浪费资源
3. 同一域名浏览器有最大并行请求限制

### cookie 鉴权

请求

POST /login HTTP/1.1
Host: jirengu.com
Content-Type: application/json;charset=UTF-8

{username: "hunger", password: "123456"}

响应

HTTP/1.1 200 OK

Content-Type: application/json; charset=utf-8

set-cookie: sid=abc24sf; Path=/; Expires=Wed, 03 Feb 2021 12:14:36 GMT; HttpOnly; Secure; SameSite=Strict

{"status": "ok"}

- set-cookie 告诉浏览器我要种 cookie
- 在 Wed, 21 Oct 2021 06:18:00 GMT 时这个 cookie 失效
- 标记为 Secure 的 Cookie 只应通过被 HTTPS 协议加密过的请求发送给服务端
- 使用 HttpOnly 属性告诉浏览器禁止通过 JavaScript 访问 cookie 值
- SameSite=Strict 告诉浏览器跨域请求时不要带上 cookie，设置为 none 时表示跨域也能带上

GET /search HTTP/1.1

Host: xxx.com

Cookie: sid=abc24sf;

{"q":"asd"}

带着 cookie 去请求，服务器可以识别身份。

### Token 鉴权

请求

POST /login HTTP/1.1

Host: xxx.com

Content-Type: application/json;charset=UTF-8

{username: "hunger", password: "123456"}

响应

HTTP/1.1 200 OK

Content-Type: application/json; charset=utf-8

{"status": "ok", "token": "abcd1234"}

请求

GET /search HTTP/1.1

Host: xxx.com

Cookie: sid=abc24sf

Authorization: Bearer abcd1234

{"q":"kkk"}

用 Aurorization 带着 token 去请求，服务器可以识别身份。

#### withCredentials

XMLHttpRequest.withCredentials 属性是一个 Boolean 类型，它指示了是否该使用类似 cookies,authorization headers(头部授权)或者 TLS 客户端证书这一类资格证书来创建一个跨站点访问控制（cross-site Access-Control）请求。在同一个站点下使用 withCredentials 属性是无效的。

如果在发送来自其他域的 XMLHttpRequest 请求之前，未设置 withCredentials 为 true，那么就不能为它自己的域设置 cookie 值。而通过设置 withCredentials 为 true 获得的第三方 cookies，将会依旧享受同源策略，因此不能被通过 document.cookie 或者从头部相应请求的脚本等访问。

## HTTP2

基于二进制流。 将一个 TCP 连接分为若干个流（Stream），每个流中可以传输若干消息（Message），每个消息由若干最小的二进制帧（Frame）组成。
将 HTTP 消息分解为独立的帧，交错发送，然后在另一端重新组装。

并行交错地发送多个请求，请求之间互不影响。
并行交错地发送多个响应，响应之间互不干扰。
使用一个连接并行发送多个请求和响应。

![http2](./4.svg)

### HTTP2.0 的特性、为什么有这些变化、好在哪里

Http1.x 存在的问题

1. pipeling 传输方式浏览器在处理时有各自问题和 bug，所以一般默认也未开启支持。另外对于大文件依旧会存在服务器阻塞。
2. 主流用的还是 keep-alive，在一个连接里资源的请求是串行的。为了加快并行速度浏览器会开多个连接，一个域名默认最多开约 6 个连接，超过限制数目的请求会被阻塞。（所以一些网站静态资源使用了多个域名，但域名太多管理不便且域名解析也需要时间）
3. 只能客户端主动发起请求，不能服务器主动发起
4. 请求/响应首部太大了，未经压缩就发送，浪费
5. 每次请求/响应的首部大都是冗余的重复的内容
6. 数据压缩非强制，可能存在未经压缩的情况
7. 请求顺序没优先级，只能听天命(HTML 资源顺序)
8. 客户端可以解析 html 发送一个个的资源请求，服务器也能啊
9. 更多...

Http2.0 的改进

1. 基于二进制流。 将一个 TCP 连接分为若干个流（Stream），每个流中可以传输若干消息（Message），每个消息由若干最小的二进制帧（Frame）组成。
2. 多路复用(Multiplexing)。一个 TCP 连接，可以无限制处理多个请求
3. 请求可以设置优先级
4. 压缩 Http 首部
5. 服务器推送(Server Push) 。客户端发送获取 HTML 的请求，服务器把 HTML 以及 HTML 里需要的资源一起发过去
6. 服务器提示(Server Hints)，preload 和 prefetch。 浏览器会在空闲的时间加载这个大的图片，下次请求可能会用到

### HTTP3 改进

HTTP / 3 是 HTTP 即将发布的主要版本。HTTP 语义在各个版本之间是一致的：相同的请求方法，状态代码和消息字段通常适用于所有版本。不同之处在于这些语义到基础传输的映射。HTTP / 1.1 和 HTTP / 2 使用 TCP 作为其传输。HTTP / 3 使用 QUIC，这是 Google 最初开发的一种基于 UDP 的传输层网络协议。改用 QUIC 的目的是解决 HTTP / 2 的一个主要问题 HOL 阻塞 (head-of-line blocking) 。HTTP / 1.1 中的 HOL 是指当浏览器中允许的并行请求数用完时，随后的请求需要等待前一个请求完成。HTTP / 2 通过请求复用解决了此问题，该复用消除了应用程序层的 HOL 阻塞，但 HOL 仍存在于传输（TCP）层。

小知识 Preload 与 Server Push

- preload 预加载，告诉浏览器下一步立即要加载什么资源。<link rel="preload" href="https://example.com/images/large-background.jpg">
- prefetch 预加载，告诉浏览器下一步要加载什么资源。在空闲时加载。<link rel="preload" href="https://example.com/images/music.mp3">

## 加密
### 对称加密

对称加密是最快速、最简单的一种加密方式，加密（encryption）与解密（decryption）用的是同样的密钥（secret key）。对称加密有很多种算法，由于它效率很高，所以被广泛使用在很多加密协议的核心当中。

对称加密的一大缺点是密钥的管理与分配，换句话说，如何把密钥发送到需要解密你的消息的人的手里是一个问题。在发送密钥的过程中，密钥有很大的风险会被黑客们拦截。现实中通常的做法是将对称加密的密钥进行非对称加密，然后传送给需要它的人。

### 非对称加密

非对称加密为数据的加密与解密提供了一个非常安全的方法，它使用了一对密钥，公钥（public key）和私钥（private key）。私钥只能由一方安全保管，不能外泄，而公钥则可以发给任何请求它的人。非对称加密使用这对密钥中的一个进行加密，而解密则需要另一个密钥。比如，你向银行请求公钥，银行将公钥发给你，你使用公钥对消息加密，那么只有私钥的持有人--银行才能对你的消息解密。与对称加密不同的是，银行不需要将私钥通过网络发送出去，因此安全性大大提高。

### 对称加密与非对称加密的区别

虽然非对称加密很安全，但是和对称加密比起来，它非常的慢，所以我们还是要用对称加密来传送消息，但对称加密所使用的密钥我们可以通过非对称加密的方式发送出去。为了解释这个过程，请看下面的例子：

（1） Alice需要在银行的网站做一笔交易，她的浏览器首先生成了一个随机数作为对称密钥。

（2） Alice的浏览器向银行的网站请求公钥。

（3） 银行将公钥发送给Alice。

（4） Alice的浏览器使用银行的公钥将自己的对称密钥加密。

（5） Alice的浏览器将加密后的对称密钥发送给银行。

（6） 银行使用私钥解密得到Alice浏览器的对称密钥。

（7） Alice与银行可以使用对称密钥来对沟通的内容进行加密与解密了。

总结： 
- 对称加密加密与解密使用的是同样的密钥，所以速度快，但由于需要将密钥在网络传输，所以安全性不高。

- 非对称加密使用了一对密钥，公钥与私钥，所以安全性高，但加密与解密速度慢。

- 解决的办法是将对称加密的密钥使用非对称加密的公钥进行加密，然后发送出去，接收方使用私钥进行解密得到对称加密的密钥，然后双方可以使用对称加密来进行沟通。