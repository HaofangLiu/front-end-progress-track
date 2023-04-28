# HTML

## HTML history

超文本标记语言（英語：HyperText Markup Language，简称：HTML）是一种用于创建网页的标准标记语言。HTML 是一种基础技术，常与 CSS、JavaScript 一起被众多网站用于设计网页、网页应用程序以及移动应用程序的用户界面。网页浏览器可以读取 HTML 文件，并将其渲染成可视化网页。HTML 描述了一个网站的结构语义随着线索的呈现，使之成为一种标记语言而非编程语言。

HTML 的首个公开描述出现于一个名为 HTML Tags 页面存档备份，存于互联网档案馆的文件中，由蒂姆·伯纳斯-李于 1991 年底提及。它描述 18 个元素，包括 HTML 初始的、相对简单的设计。除了超链接标签外，其他设计都深受 CERN 内部一个以标准通用标记语言（SGML）为基础的文件格式 SGMLguid 的影响。这些元素仍有 11 个存在于 HTML 4 中。

## HTML 起手应该写什么

```html
<!DOCTYPE html>

<html>
  <head>
    <title></title>
  </head>

  <body></body>
</html>
```

## 常用的表章节的标签有哪些，分别是什么意思（h1~h6、section、article、main、aside 等等）

- h1-h6 标题
- section 章节
- article 文章
- main 主要的内容
- aside 旁边的内容（标记）
- header 头部
- footer 页脚
- p 正文
- ul li - unordered list
- ol li - ordered list
- table 表格
- dl-dt-dd 描述列表，dt 描述对象，dd 描述内容

## 全局属性有哪些

- class 可以多次重复用，可以拥有多个，空格分开
- hidden （经过验证类似于 checked,假如行内设置则一定生效，js 则可以通过节点 ele.hidden = true/false 去设置）
- id 尽量用 class，除非确定项目唯一时可以用
- tabindex 0-> last，正数按照数值大小排序，负数无法访问
- title 网页标题
- style="css code"
- contenteditable 可编辑
- data-xxx:可以用来储存一些相应的数据 在 js 中可以用 node.dataset.xxx 来获取自定义属性的 value

## 常用的内容标签有哪些，分别是什么意思（a、strong、em、code、pre 等等）

- a link 跳转
- strong 加强内容 默认加粗
- em 加强语气 默认斜体
- code 代码块
- pre 空格，tab，enter 生效

## 常见标签

header:头部

main: 主体

footer:页脚

nav:导航

section:章节

h1~h6:标题

article:文章

aside:侧边栏

div:剩下所有的

pre 标签：一般用于展示代码（具有格式的一些文本）内包含 code 标签

```html
<pre>
<code>
</code>
</pre>
```

### 移动端页面为什么要加`<meta name="viewport" content="width=device-width">`

1. 我们页面本身是移动端设计风格的页面，设计师在设计页面时按移动端通用的 375px 或者 428px 来做设计，我们需要在 head 标签里加`<meta name="viewport" content="width=device-width">`。如果原本就是针对 PC 浏览器设计的页面未适配过移动端，不建议加此 meta。
2. 这句话的意思是让页面的布局视口的宽度等于视觉视口的宽度，此时页面元素会以设备逻辑像素宽度做为文档宽度进行布局。
3. 如果不加，则页面元素会以 980px 的文档宽度进行布局，然后 980px 的宽度再缩小填充整个屏幕。会导致页面元素看起来比较小。

### a 标签的用法

属性：
href： hyper reference 也就是我们说的超链接。 能够跳转外部的页面
也可以认为是锚点，#id 就可以跳转对应的节点
target： 在哪一个窗口打开，参数包含：
\_blank ：新窗口
\_self： 本身所在的窗口
\_top： 假如包含了很多内嵌网页，则在最顶端的窗口打开
\_parent： 父级窗口打开
target 也可以给定一个任意值，不用下划线开头，则浏览器会通过 window.name 确定是哪一个窗口
download:下载 ---需要考虑兼容问题

通常隐式标签触发，href 链接 blob 或者 dataURL 去下载。download 属性对应下载的文件名

### link 标签的 as 属性

as 属性是 HTML <link> 元素的一个可选属性，用于指定资源的 MIME 类型或媒体查询。

如果资源是通过不同的 MIME 类型提供的，您可以使用 as 属性指定所请求的资源类型。 例如，如果您的资源有一个 XML 文档和一个 JSON 文档的版本，您可以使用 as 属性来指定所请求的文档类型。

另一方面，如果资源是根据不同的媒体类型提供的，您可以使用 as 属性来指定所请求的媒体类型。 这可以帮助浏览器更好地了解您的资源，并优化资源的加载。

例如，以下代码段使用 as 属性来指定图像资源的媒体类型和大小：

```html
<link rel="preload" href="image.png" as="image" media="(min-width: 640px)" />
```

这告诉浏览器在大于或等于 640 像素宽度的屏幕上预加载 image.png 图像，并将其视为一个图像资源。

### img 标签的用法

图片标签，发送 get 请求获取图片
alt:图片说明
src: 图片地址
height/width(图片 img 标签内不能同时有 width 和 height，会使图片变形)
可以用事件监听：onload/onerror

### table 标签的用法

！一定要规范去设计表格！

```html
<table>
  <thead>
    <tr>
      <th></th>
      <td></td>
    </tr>
  </thead>
  <tbody></tbody>
  <tfoot></tfoot>
</table>
```

tr-table row

td-table data

th-table head

table-layout（auto 看内容自动，fixed 等宽，inherit，initial，unset）用于表格单元格，行列的算法

border-collapse：collapse；单元格合并

border-spacing：单元格之间的空隙，一般设为 0.

### form 标签的用法

form 表单：发送 get/post 请求，然后刷新页面

属性：
action:要请求的 url

autocomplete： 自动提示，通过 input name 属性，则可以记录这个 name 的控件曾经输入过的 value

method: GET/POST

target：类似于 a 标签的 target
可以监听 onsubmit 事件：注意区分 input type='submit'和 button type='submit'区别，button 内部可以有其他的标签。

对于属性为 radio 类型的 input，假如有多个选项，（分组为目的）的情况下，name 属性要相同才能取值。

- 注意：form 中的 input 都要有 name 属性

### form 表单防止 csrf 攻击

通过设置 input type=hidden 并且 value 附带后台生成的 token 来验证是否为同一个用户的操作（请求）

### HTMLFormElement 的实例属性

elements：返回一个类似数组的对象，成员是属于该表单的所有控件元素。该属性只读。
length：返回一个整数，表示属于该表单的控件数量。该属性只读。
name：字符串，表示该表单的名称。
method：字符串，表示提交给服务器时所使用的 HTTP 方法。
target：字符串，表示表单提交后，服务器返回的数据的展示位置。
action：字符串，表示表单提交数据的 URL。
enctype（或 encoding）：字符串，表示表单提交数据的编码方法，可能的值有 application/x-www-form-urlencoded、multipart/form-data 和 text/plain。
acceptCharset：字符串，表示服务器所能接受的字符编码，多个编码格式之间使用逗号或空格分隔。
autocomplete：字符串 on 或 off，表示浏览器是否要对<input>控件提供自动补全。
noValidate：布尔值，表示是否关闭表单的自动校验。

## get 和 post 类型有什么区别

1. 提交的数据形式不一样，GET 是 name=value，并且用&链接。 POSTurl 不会变

2. 数据大小区别。GET 有可能很长（对数据大小有限制），POST 则不变所以没有限制

3. 语义上的区别。GET 主要是获取大量数据。POST 而是客户端要提交给服务端一些信息

4. 安全上差别。GET 拼出来的 URL，可以在 URL 中看到你传的字段（比如用户名密码可能会被看到），还有日志也会记录到你传的信息。而 POST 因为信息不在 URL 中，所以 POST 查不到其中的信息
