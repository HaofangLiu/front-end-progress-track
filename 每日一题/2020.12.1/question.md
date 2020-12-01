[html] 你有使用过summary标签吗？说说它的用途
[css] css变量属性有什么用途？有什么优缺点？
[js] 写出js各类型转化为Boolean的值分别是什么？及转化的规则是什么？
[软技能] 说说你对专利的了解


## answer 2:

* css变量属性可以由作者定义，包含的值能够在整个项目中使用，否则就要一个一个去替换。
* 另外的优点就是可以实现语义化

缺点就是 复杂项目不易不懂
兼容性不是很完美


## answer 3:
JavaScript中，只有 6 种值可以被转换为false，其余都会被转换成 true。

    console.log(Boolean(undefined)) // false

    console.log(Boolean(null)) // false

    console.log(Boolean(+0)) // false

    console.log(Boolean(-0)) // false

    console.log(Boolean(NaN)) // false

    console.log(Boolean("")) // false
所有对象转为布尔值都会是 true