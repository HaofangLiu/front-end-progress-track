[html] 使用canvas能实现哪些复杂的功能？
[css] 如何判断dpr的倍数？
[js] 请解释下执行栈有哪些特点？
[软技能] 你了解什么是无界画布吗？


// 1. 复杂动画，游戏，banner

// 2.window.devicePixelRatio

// 3. 


为了模拟执行上下文栈的行为，让我们定义执行上下文栈是一个数组：
ECStack = [];


试想当 JavaScript 开始要解释执行代码的时候，最先遇到的就是全局代码，所以初始化的时候首先就会向执行上下文栈压入一个全局执行上下文，我们用 globalContext 表示它，并且只有当整个应用程序结束的时候，ECStack 才会被清空，所以程序结束之前， ECStack 最底部永远有个 globalContext：

现在 JavaScript 遇到下面的这段代码了：

function fun3() {
    console.log('fun3')
}

function fun2() {
    fun3();
}

function fun1() {
    fun2();
}

fun1();
 
 / 伪代码

// fun1()
ECStack.push(<fun1> functionContext);

// fun1中竟然调用了fun2，还要创建fun2的执行上下文
ECStack.push(<fun2> functionContext);

// 擦，fun2还调用了fun3！
ECStack.push(<fun3> functionContext);

// fun3执行完毕
ECStack.pop();

// fun2执行完毕
ECStack.pop();

// fun1执行完毕
ECStack.pop();

// javascript接着执行下面的代码，但是ECStack底层永远有个globalContext