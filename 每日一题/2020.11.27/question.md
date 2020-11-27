[html] 如何给<video>视频添加字幕(WebVTT)？ track控制
[css] 说说你对screen.width伪响应式的理解
[js] 分析下sum = n * (n - 1) / 2的时间复杂度是什么？
[软技能] 说说你对ASCII码的了解，它有什么用途？

说说你对screen.width伪响应式的理解：

传统的响应式开发主要基于media query查询
@media query and (max-width: 480px){

}
@media可以实时体验窄边效果。 那么js是不是也需要一个做响应开发。
因为pc和移动端有很多不同的交互逻辑，HTML用的是一套，那js的逻辑是不是也要跟随发生变化

因此可以用screen.width做伪响应式开发。这个api会跟随屏幕的宽度（跟显示器的宽度无关）

只要我们确认了用户的屏幕尺寸，我们就可以在一开始就确定我们的页面布局以及所需要的交互，例如，可以在<head>标签内放入这么一段内联script:

(function(doc, win) {
    var screenWidth = 0, size = 'M', root = doc.documentElement;
    if (window.screen && screen.width) {
        screenWidth = screen.width;
        if (screenWidth > 1920) {
            // 超大屏，例如iMac
            size = 'L';
        } else if (screenWidth < 480) {
            // 小屏，如手机
            size = 'S';
        }
    }
    // 标记CSS
    root.className = size;
    // 标记JS
    win.SIZE = size;        
})(document, window);


上面的脚本在页面加载的一开始，就确定了是大屏，普通屏还是小屏，然后再执行响应的渲染和脚本执行。您可以根据自己实际项目，修改上面的size变量。

于是乎，我们无论是CSS渲染还是JS逻辑处理，都是1条线下来，完全没有@media screen即时切换而不得已耦合在一起的JS逻辑处理。


分析下sum = n * (n - 1) / 2的时间复杂度是什么？
// O(n^2)

因为当趋近于无穷打的时候，1/2n 可以忽略， n^2 是起主导作用的
