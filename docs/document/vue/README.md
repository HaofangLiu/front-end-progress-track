# Vue.js

记录学习 Vue.js 过程

## Vue

> Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

- 数据驱动视图 （数据发生变化，视图自动更新）

### 基础语法

数据修改：
`v-on:click="add" 或者 @click="add"`

属性绑定：
`v-bind:href="url" 或者 :title="title"`

双向绑定（视图修改数据，数据渲染视图）：
`v-model="search"` eg: input 表单中的 value 会修改 data 中的 search，search 会渲染在页面上展示出来

条件渲染：
`v-if="isShow"` method 中有一个 isShow 方法
`v-show="isShow"` 子组件不会卸载，仅仅显示隐藏

列表渲染：
`v-for="value in items".`

自定义组件：

```
<div id="app">
 <fieldset>
    <legend>⾃定义组件</legend>
    <ul>
        <todo-item v-for="todo in items" :todo="todo" :key="todo.id"></todo-item>
    </ul>
 </fieldset>
 </div>
 <script>
 const App = {
    data() {
        return {
            items: [
                { id: 0, text: 'item0' },
                { id: 1, text: 'item1' },
                { id: 2, text: 'item2' },
            ]
        }
    }
 }
 const app = Vue.createApp(App)
 app.component('todo-item', {
    props: ['todo'],
    template: '<div>{{todo.text}}</div>'
 })
 app.mount('#app')
 </script>
```

### 组件实例与生命周期

Vue.createApp(App)会创建一个 app 应用实例， app.mount(#app) 会生成并挂载根组件实例。 （对于其他子组件同理,都会有自己对应的组件实例）

**beforeCreate**
在实例初始化以后，数据观测和 event/watcher 事件配置之前被调用

**created**
实例创建完成后被立即调用。 在这一步，实例已经完成以下的配置： 数据观测（data observer） property 和方法的运算， watch/event 事件回调。 然而挂载阶段还没开始， `$el`property 还不可用

**beforeMount**
在挂载开始之前被调用： 相关的 render 函数首次被调用

**mounted**
实例被挂载后调用。 这时`Vue.createApp({}).mount()`被新创建的`vm.$el`替换了。 如果根实例挂载到了一个文档内的元素上，当 mounted 被调用时`vm.$el`也在文档内

**beforeUpdate**
数据更新时调用，发生在虚拟 DOM 打补丁之前

**updated**
由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这以后会调用这个钩子

**beforeUnmount**
在卸载组件实例之前调用。这个阶段实例是完全正常的

**unmounted**
卸载组件实例后调用，调用这个钩子时，组件实例的所有指令都被解除绑定，所有事件侦听器都被移除，所有子组件实例被卸载

![Vue-lifeCycle](https://cn.vuejs.org/images/lifecycle.png)

- 如果需要发送 ajax 请求，应该放在哪个生命周期？
  在 created 以后的声明周期都可以，因为已经有数据存在

- 父子组件嵌套时， 父组件视图和子组件视图渲染完成谁先谁后？
  不确定，从生命周期来看无法判断谁先谁后，子组件渲染完成，父组件不渲染也看不到

- 父子组件嵌套时，如果希望在所有组件视图都渲染完成后再执行操作，该怎么做？

```
mounted(){
    this.$nextTick(function(){
        // 仅在渲染整个视图之后运行的代码
    })
}
```

### 模板语法

1. 文本
   `<span>Message: {{ msg }}</span>`
   same as
   `<span v-text="msg"></span>`
   `<span v-once>这个将不会改变: {{ msg }}</span>`
   仅仅渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。可以用于优化性能

2. 表达式
   `<span>{{ number + 1 }}</span>`
3. 原始 HTML
   `<span v-html="rawHtml"></span>`
   用于更新元素的 innerHTML。注意可能带来 XSS 攻击，仅仅使用在确认信任的内容上
4. 属性
   `<a v-bind:href="url"> ... </a>`
   same as
   `<a :href="url"> ... </a>`
5. 事件
   `<a v-on:click="doSomething"> ... </a>`
   same as
   `<a @click="doSomething"> ... </a>`
   `<a @[event]="doSomething"> ... </a>`

### Data Property 和 methods

- data 选项是一个函数，返回一个对象（Vue2 的 data 可以是对象，但 vue3 只能是函数，否则报错）
- 对尚未提供所需值的 property 使用 null、undefined 等占位
- 实例创建后再添加的 property，响应式系统不会跟踪

### 计算属性 computed

- 计算属性 count 会依赖 data 中的属性 books，books 发生改变自动出发 count 的变化

```
<div id="app">
 <p>{{name}} published {{count}} books:</p>
 <button @click="add">Add book</button>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
 Vue.createApp({
    data() {
        return {
            name: 'John Doe',
            books: ['book1']
            }
        },
        methods: {
            add() {
            this.books.push('book')
            }
        },
        computed: {
            count() {
            return this.books.length
        }
    }
 }).mount('#app')
</script>
```

- 注意： 计算属性有缓存机制，如果依赖的数据未发⽣改变，则不会重新计算⽽是直接使⽤缓存值
- 注意 methods 和 computed ⾥⾯的⽅法不要使⽤箭
  头函数，否则 this 就不是 vm 对象了
- methods 和 computed 差异：前者为方法，无论修改是否是依赖的值都会发生调用。 后者是属性，仅仅在依赖的属性发生变化的时候才会触发

### Watch

watch 会监控 data 中某个 property 的变化，执行函数

```
const vm = Vue.createApp({
    data() {
        return {
        name: 'jirengu'
        }
    },
    watch: {
        name(newname, oldname) {
        console.log(oldname + '-> + newname)
        }
    }
 }).mount('#app')
```

- 什么时候需要用 watch？
  - 当只需要根据 data 中某个 property 的变化做出反应，不一定需要结果时。
  - 当有异步操作时
  - 当需要用到旧值时

### 响应式原理

- 到底什么是数据响应式
  追踪数据的变化，在读取数据或者设置数据的时候能劫持做一些操作。

  使用 object.defineProperty -> Vue2

  使用 Proxy -> Vue3

```
var obj = {}
var age
Object.defineProperty(obj, 'age', {
    get: function(){
        console.log('get age...')
        return age
    },
    set: function(val){
        console.log('set age...')
        age = val
    }
})
obj.age = 100  // 'set age...'
console.log(obj.age) // 'get age...', 100
```

### Proxy 和 Reflect

**proxy** 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找，赋值，枚举，函数调用等）

**Reflect** 是一个内置的对象，它提供拦截 Javascript 操作的方法，这些方法和 Proxy handlers 相同。

```
const dinner = {
  meal: 'tacos'
}

const handler = {
  get(target, prop) {
    console.log('get...', prop)
    //return target[prop]
    return Reflect.get(...arguments)
  },
  set(target, key, value) {
    console.log('set...', key, value)
    //target[key] = value
    return Reflect.set(...arguments)
  }
}

const proxy = new Proxy(dinner, handler)
console.log(proxy.meal)

```

但是这里仅能响应式一层的对象，可以封装实现：

```
function reactive(obj){
    const handler = {
        set(target, key, value, receiver){
            return Reflect.set(...arguments)
        },
        get(target,prop){
            const value = Reflect.get(...arguments);
            if(typeof value === 'object'){
                reactive(value)
            }
            else{
                return value;
            }
        }
    }
    return new Proxy(obj,handler)
}
```

- Vue2 用 Object.defineProperty 实现响应式， Vue3 使用 Proxy 实现响应式。 对比有什么优缺点？
  - Proxy 能劫持整个对象， 而 Object.defineProperty 只能劫持对象的属性； 前者递归返回属性对应的值的代理即可实现响应式。 后者需要深度遍历每个属性。 后者对数组的操作不友好。

### 条件渲染

- `v-if` 的变化会创建/删除元素， `v-show`变化只是元素的展示/隐藏(display:none)
- 对于多个元素的控制可以用`<template>`包裹

### v-for 列表渲染

- `v-for`可基于数组渲染列表
- 也可基于对象渲染列表
- 可以使用值的范围
- 可以在组件上循环渲染
- `v-for`默认使用‘就地更新’ 策略， 数据项的顺序被改变，Vue 就不会移动 DOM 元素来匹配数据项的顺序， 而是就地更新每个元素。
- 为能跟踪每个节点的身份，重用和重新排序现有元素，提升性能，需要使用 key

```
<li v-for="item in array">{{item}}</li>
<li v-for="(item, index) in array">{{item}}</li>
<li v-for="value in myObject">{{value}}</li>
<li v-for="(value, key) in myObject">{{key}}:
{{value}}</li>
<span v-for="n in 10">{{ n }} </span>
<!--1,...,10-->
<my-component v-for="(item, index) in
items" :item="item" :key="item.id"></mycomponent>
```

### 事件处理

- `@click` 的值既可以是 methods 里的函数名，执行函数时参数是点击事件
- 也可以是函数的调用，执行函数时参数时调用时传递的参数，可以传递固定值，可传递 data 的属性，也可传递\$event

```
<span v-on:click="sayHello">click</span>
<span @click="sayHello">click</span>
<span @click="sayHello('hunger')">click</span>
<span @click="sayHello($event),
sayHi('hunger')">click</span>
<span @click.once="sayHello(name)">click</span> // 仅仅执行一遍
<span @click.stop="sayHello">click</span> // 指的是阻止父组件（节点）的事件冒泡
```

### v-model 双向绑定（针对输入框，表单等）

```
<input v-model="message" /> {{ message }} //相应onInput事件
<textarea v-model.lazy="message"></textarea> {{ message }} // 相应onChange事件
<input type="checkbox" v-model="checked" /> {{checked}}
<!-- 复选框 -->
<input type="checkbox" value="a" v-model="list" />
<input type="checkbox" value="b" v-model="list" /> {{list}} //多选一定要有value
<!-- 单选框 -->
<input type="radio" value="a" v-model="theme" />
<input type="radio" value="b" v-model="theme" /> {{theme}}
<!-- select -->
<select v-model="selected">
 <option value="AA">A</option>
 <option value="BB">B</option>
 <option value="CC">C</option>
</select>
{{selected}}
```

### 组件基础

- 每个组件维护独立的数据
- app.component('组件名'，{})注册组件
- 通过 prop 向子组件传递数据
- 子组件触发事件来实现子传父

```
<div id="app">
 <font-size step="1" :val="fontSize" @plus="fontSize += $event"
 @minus="fontSize -= $event"></font-size>
 <font-size step="3" :val="fontSize" @plus="fontSize += $event"
 @minus="fontSize -= $event"></font-size>
 <p :style="{fontSize:fontSize+'px'}">Hello {{fontSize}}</p>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
 const app = Vue.createApp({
 data() { return { fontSize: 16 } }
 })
 app.component('font-size', {
 props: ['val', 'step'],
 template: `
 <div>step: {{step}}
 <button @click="onPlus">+</button>
 <button @click="$emit('minus', step)">-</button>
 </div>`,
 methods: {
 onPlus() { this.$emit('plus', parseInt(this.step)) }
 }
 })
 app.mount('#app')
</script>
```

### v-model 实现双向绑定

- 父组件通过 v-model="属性" 把属性传递给子组件
- 子组件内有一个 modelValue 的 prop，接受父组件传递的数据
- 子组件通过触发 update:modelValue 修改父组件绑定的属性

```
<input v-model="searchText" />
<!--等价于-->
<input :value="searchText" @input="searchText = $event.target.value" />
```

```
<div id="app">
 <font-size step="1" v-model="fontSize"></font-size>
 <font-size step="4" v-model="fontSize"></font-size>
 <p :style="{fontSize:fontSize+'px'}">Hello {{fontSize}}</p>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
 const app = Vue.createApp({
 data() { return { fontSize: 16 } }
 })
 app.component('font-size', {
 props: ['modelValue', 'step'],
 template: `
 <div>fontSize: {{modelValue}}
 <button @click="$emit('update:modelValue',+step+modelValue)">+</button>
 <button @click="$emit('update:modelValue', modelValue-step)">-</button>
 </div>`
 })
 app.mount('#app')
</script>
```

### 单向数据流

- 什么是单向数据流？
  父组件能直接传递数据给子组件，子组件不能随意修改父组件状态

- 为什么单向？
  目的是让数据传递变得简单，可控，可追溯。

- 如何实现双向？
  父组件可以通过设置子组件的 props 直接传递数据给子组件。 子组件想传递数据给父组件时，可以在内部 emit 一个自定义事件，父组件可以在子组件上绑定该事件的监听，来处理子组件 emit 的事件和数据。

在 Vue 中， v-model 实现的所谓双向绑定，本质就是这样

### 全局组件和局部组件

```
app.component('component-a',{...}) // 全局组件

const component = {components: {...}} // 局部组件
```

### 组件命名

- kebab-case 短横线连接全小写的单词
- 声明时使用 kebab-case，模板里必须用 kebab-case

```
app.component('component-a',({})
<component-a></component-a>
```

- PascalCase 多个首字母大写单词直接连接
- 声明时使用 PascalCase，模板里可以用 kebab-case 和 PascalCase

```
app.component('ComponentB',({})
<component-b></component-b>
<ComponentB></Component-B>
```

### Props

#### 写法：

```
props: ['name', 'other']
props: {
name: String,
other: Number //Boolean, Array, Object, Function
}
props: {
name: {
//传递的prop如果不满足条件，控制台会有警告
type: String,
required: true,
//default: 'hello'
}
}

```

#### v-bind

```
post: {
id: 1,
title: 'My Journey with Vue'
}
以下两种写法等价
<blog-post v-bind="post"></blog-post>
<blog-post v-bind:id="post.id"
v-bind:title="post.title"></blog-post>
```

### 非 prop 的 attribute

- 指的是父组件模板里在使用子组件时设置了属性，但子组件内没有通过 Props 接收
- 当组件返回单个根节点时，非 prop attribute 将自动添加到根节点的 attribute 中
- 在子组件里可以通过`$attrs / this.$attrs` 获取 attributes
- 如果想在非根节点应用传递的 attribute，使用`v-bind="$attrs"`

```
<div id="app">
<user class="username"
:data-user="username"></user>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
const User = {
template: `<div>{{$attrs['data-user']}}</div>`
}
Vue.createApp({
components: { User },
data() {
return { username: 'hunger' }
}
}).mount('#app')
</script>
```

```
div id="app">
<username class="username" :error="errorMsg"
@input="onInput"></username>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
const Username = {
props: ['error'],
template: `
<fieldset>
<legend>用户名</legend>
<input v-bind="$attrs">
<div>{{error}}</div>
</fieldset>
`
}
Vue.createApp({
components: { Username },
data() {
return { errorMsg: '' }
},
methods: {
onInput(e){
this.errorMsg = e.target.value.length<6?"长度不够":""
}
}
}).mount('#app')
</script>
```

### 自定义事件

- 子组件内触发事件用 `this.$emit('my-event')`
- 父组件使用子组件时绑定`<component-a @my-event="doSomething"></component-a>`
- 推荐 kebab-case 事件名，区分大小写

```
<div id="app">
      <h1>{{username}}</h1>
      <user
        class="username"
        :data-user="username"
        @user-change="username=$event"
      ></user>
    </div>
    <script src="https://unpkg.com/vue@next"></script>
    <script>
      const User = {
        props: ["dataUser"],
        events: ["user-change"],
        template: `<div>{{dataUser}} <button @click='updateUser'>update</button></div>`,
        methods: {
          updateUser() {
            this.$emit("user-change", this.dataUser + "!");
          },
        },
      };
      Vue.createApp({
        components: { User },
        data() {
          return {
            username: "hunger",
          };
        },
      }).mount("#app");
    </script>
```

#### v-model 自定义事件语法糖

```
<com v-model:foo="bar"></com> //等价于
<com :foo="bar" @update:foo="bar=$event">
```

```
<div id="app">
<h1>{{username}}</h1>
<user class="username"
v-model:user="username"></user>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
const User = {
props: ['user'],
template: `<div>{{user}} <button @click="update
User">update</button></div>`,
methods: {
updateUser() {
this.$emit('update:user', this.user + '!')
}
}
}
Vue.createApp({
components: { User },
data() {
return { username: 'hunger' }
}
}).mount('#app')
</script>
```
