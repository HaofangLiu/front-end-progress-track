[html] 你有使用过kbd标签吗？说说它的用途
[css] css变量受哪些影响？
[js] 写一个方法将虚拟Dom转化为真实DOM
[软技能] 你有自己或者为公司写过专利吗？

1. kbd tag Define some text as keyboard input in a document:

```html

<p>Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy text (Windows).</p>

<p>Press <kbd>Cmd</kbd> + <kbd>C</kbd> to copy text (Mac OS).</p>

```



3. virtual-dom 

```
class Element{
    constructor(type,attr,children){
        this.type=type;
        this.attr=attr;
        this.children=children;
        /*this.props={...attr,children:children}*/
    }
    render(){
        // 这个方法将虚拟的DOM转成真实的DOM；
        let ele = document.createElement(this.type);
        // 2. 设置行间属性
        for(let key in this.attr){
            let _key = key;
            if(key==="className"){
                _key="class"
            }
            if(key==="htmlFor"){
                _key="for"
            }
            ele.setAttribute(_key,this.attr[key]);
        }
        // 3.children
        this.children.forEach(item=>{
            // 如果数组中的成员是Element的实例,需要继续调用render方法；将虚拟的DOM转成真实的DOM；
            // 循环子节点，都放入ele中；
            let curEle = item instanceof Element?item.render():document.createTextNode(item);
            ele.appendChild(curEle);
        });
        return ele;// 将创建的元素转成DOM返回；
    }
}
let obj = {
    createElement(type,attr,...children){
        // type: 元素类型
        // attr：行间属性
        // children : 子节点 ... 把多余的参数放进一个数组中；
        return new Element(type,attr,children)
    }
}
let objDOM ={
    render(element,container){
        // container : 容器，根元素；
        // element: 虚拟的DOM对象；当render执行时，让这个虚拟的DOM转成真实的DOM；
        container.appendChild(element.render())
    }
}
let y = obj.createElement("div",{a:1,className:12},"中国北京")
objDOM.render(y,document.getElementById("root"))
```