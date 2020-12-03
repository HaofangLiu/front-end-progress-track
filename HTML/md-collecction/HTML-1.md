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
通常隐士标签触发，href链接blob或者dataURL去下载。download属性对应下载的文件名

# img 标签的用法
图片标签，发送get请求获取图片
alt:图片说明
src: 图片地址
height/width

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