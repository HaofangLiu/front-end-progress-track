1. HTML history

超文本标记语言（英語：HyperText Markup Language，简称：HTML）是一种用于创建网页的标准标记语言。HTML是一种基础技术，常与CSS、JavaScript一起被众多网站用于设计网页、网页应用程序以及移动应用程序的用户界面。网页浏览器可以读取HTML文件，并将其渲染成可视化网页。HTML描述了一个网站的结构语义随着线索的呈现，使之成为一种标记语言而非编程语言。

HTML的首个公开描述出现于一个名为HTML Tags 页面存档备份，存于互联网档案馆的文件中，由蒂姆·伯纳斯-李于1991年底提及。它描述18个元素，包括HTML初始的、相对简单的设计。除了超链接标签外，其他设计都深受CERN内部一个以标准通用标记语言（SGML）为基础的文件格式SGMLguid的影响。这些元素仍有11个存在于HTML 4中。

2. HTML 起手应该写什么

```html
<!DOCTYPE html>

<html>

<head>

<title></title>

</head>

<body></body>

</html>
```

3. 常用的表章节的标签有哪些，分别是什么意思（h1~h6、section、article、main、aside 等等）
* h1-h6 标题
* section 章节
* article 文章
* main 主要的内容
* aside 旁边的内容（标记）
* header 头部
* footer 页脚
* p 正文
* ul li - unordered list
* ol li - ordered list
* table 表格
* dl-dt-dd 描述列表，dt描述对象，dd描述内容

4. 全局属性有哪些
* class
* hidden （经过验证类似于checked,假如行内设置则一定生效，js则可以通过节点ele.hidden = true/false去设置）
* id 尽量用class，除非确定项目唯一时可以用
* tabindex 0-> last，正数按照数值大小排序，负数无法访问
* title 网页标题

5. 常用的内容标签有哪些，分别是什么意思（a、strong、em、code、pre 等等）

* a link跳转
* strong 加强内容 默认加粗
* em 加强语气 默认斜体
* code 代码块
* pre 空格，tab，enter生效