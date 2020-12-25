# 常见标签
header:头部

main: 主体

footer:页脚

nav:导航

section:章节

h1~h6:标题

article:文章

aside:侧边栏

div:剩下所有的

pre标签：一般用于展示代码（具有格式的一些文本）内包含code标签
```html
<pre>
<code>
</code>
</pre>
```

# a 标签的用法

属性：

href： hyper reference也就是我们说的超链接。 能够跳转外部的页面

也可以认为是锚点，#id就可以跳转对应的节点

target： 在哪一个窗口打开，参数包含：

_blank ：新窗口

_self： 本身所在的窗口

_top： 假如包含了很多内嵌网页，则在最顶端的窗口打开

_parent： 父级窗口打开

target也可以给定一个任意值，不用下划线开头，则浏览器会通过window.name确定是哪一个窗口

download:下载

需要考虑兼容问题

通常隐式标签触发，href链接blob或者dataURL去下载。download属性对应下载的文件名

# img 标签的用法
图片标签，发送get请求获取图片

alt:图片说明

src: 图片地址

height/width(图片img标签内不能同时有width和height，会使图片变形)

可以用事件监听：onload/onerror

# table 标签的用法

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

table-layout（auto看内容自动，fixed等宽，inherit，initial，unset）用于表格单元格，行列的算法
border-collapse：collapse；单元格合并
border-spacing：单元格之间的空隙，一般设为0.

# 其他感想

form表单：发送get/post请求，然后刷新页面
属性：
action:要请求的url

autocomplete： 自动提示，通过input name属性，则可以记录这个name的控件曾经输入过的value

method: GET/POST

target：类似于a标签的target

可以监听onsubmit事件：注意区分input type='submit'和button type='submit'区别，button内部可以有其他的标签。


对于属性为radio类型的input，假如有多个选项，（分组为目的）的情况下，name属性要相同才能取值。

* 注意：form中的input都要有name属性

# form表单防止csrf攻击
通过设置input=hidden 并且value附带后台生成的token来验证是否为同一个用户的操作（请求）

# get和post类型有什么区别
1.提交的数据形式不一样，GET是name=value，并且用&链接。 POSTurl不会变

2.数据大小区别。GET有可能很长（对数据大小有限制），POST则不变所以没有限制

3.语义上的区别。GET主要是获取大量数据。POST而是客户端要提交给服务端一些信息

4.安全上差别。GET拼出来的URL，可以在URL中看到你传的字段（比如用户名密码可能会被看到），还有日志也会记录到你传的信息。而POST因为信息不在URL中，所以POST查不到其中的信息
