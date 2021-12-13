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

- 假设是两步握手。客户端发送请求报文 A，因网络延时服务器没收到。又发了一遍报文 A，服务器收到后建立链接等待客户端发送数据。客户端正常发送数据。 过了一会第一次发送的报文 A 也到达服务器，服务器再次建立链接等待客户端发送数据，而客户端并不知情。浪费服务器资源。

## 四次挥手

客户端发送一个 FIN ，告诉服务器想关闭连接。
服务器收到这个 FIN ，发回一个 ACK。
服务器通知应用程序关闭网络连接，应用程序关闭后通知服务器。服务器发送一个 FIN 给客户端 。
客户端发回 ACK 报文确认。

## 状态码

- 1xx 信息响应 100 contine
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
