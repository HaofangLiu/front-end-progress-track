# React 知识点

## 严格模式的作用

1. 不安全的生命周期方法：某些生命周期方法在未来的 React 版本中将被弃用。严格模式会警告这些不安全的方法的使用。
2. 使用过时或遗留的 API：严格模式会警告使用过时或遗留的 API。
3. 意外的副作用：严格模式可以帮助你发现组件中可能的意外副作用。
4. 与旧版本 React 不兼容的代码：严格模式会警告你的代码中可能与未来版本的 React 不兼容的部分。

## React 和 ReactDom 两个包分别有什么作用？

1. react：这是 React 库的核心。它定义了 React 组件的创建和生命周期方法，以及 React 元素的概念。你可以将其视为 React 的“引擎”。
2. react-dom：这个库提供了在浏览器环境中使用 React 的方法，例如将 React 组件渲染到 DOM 中，或者在 DOM 中触发 React 组件的更新。你可以将其视为 React 的“驱动程序”。

## 生命周期有哪些？

![life cycle](./life.png)

- static getDerivedStateFromProps(props, state)

  - 如果你定义了 static getDerivedStateFromProps，React 会在初始挂载和后续更新时调用 render 之前调用它。它应该返回一个对象来更新 state，或者返回 null 就不更新任何内容。
  - props：组件即将用来渲染的下一个 props。
  - state：组件即将渲染的下一个 state。

- getSnapshotBeforeUpdate(prevProps, prevState)

  - render 以后， 只会在更新的时候执行
  - 如果你实现了 getSnapshotBeforeUpdate，React 会在 React 更新 DOM 之前时直接调用它。它使你的组件能够在 DOM 发生更改之前捕获一些信息（例如滚动的位置）。此生命周期方法返回的任何值都将作为参数传递给 componentDidUpdate。

- 挂载时
  - constructor()
  - render()
  - componentDidmount()
- 更新
  - componentDidUpdate(prevProps, prevState， snapshot?)
- 卸载
  - componentWillUnmount()

## 为什么 setSate 有异步更新

- react 在执行 setState 后需要执行 render， diff， 更新 DOM 等一些列操作， 性能开销是比较大的。 加入异步更新，更新合并等策略能优化性能。
- setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。（react 为了解决跨平台，兼容性问题，自己封装了一套事件机制，代理了原生的事件，像在 jsx 中常见的 onClick、onChange 这些都是合成事件）

- setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的 callback 拿到更新后的结果。

- setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和 setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 setState ， setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。

## 什么时候是异步更新， 什么时候是同步更新

- 组件里面的事件处理程序， 比如`onClick = {handleClick}`里面的 setState 是异步更新， 生命周期函数里面的 setState 是异步更新。
- 其他地方， 比如`setTimeout` 或者`addEventListener`都是同步更新。

## 列表渲染时为什么加 key

- dom diff 的时候用于识别原有的 dom，提升性能

## 受控组件与非受控组件是什么

- `<FInput value={x} onChange={changeValue} />`受控组件： 由开发者控制状态，value 等
- `<FInput defaultValue={x} ref={input} />` 非受控组件： 不由开发者控制的组件

## 组件间的通信

- 父子组件通过 props
- 爷孙组件可以通过 Context， createContext， Provider
- 任意组件可以通过 eventBus
- 更复杂的可以通过 redux， mobx 状态管理库

## shouldComponentUpdate 有什么用

- 用于优化性能，假如不需要更新视图， 则可以返回 false 去不进行这次渲染。

## 虚拟 DOM 是什么

- vDom 就是我们写的 JSX， JSX 会返回一个对象包含了属性和孩子的数据对象， 也就是虚拟 DOM。 babel 会把 JSX 变成`Reacte.createElement`, 数据对象和将来要渲染到页面的 DOM 一一对应。

# React 的原理是什么

- babel 把 jsx 变成`React.createElement` 把 JSX 变成一个包含属性和孩子的数据对象（Vdom，通过 render 方法渲染成真正的 DOM 放在页面上，当 setState 时重新执行 render， 进行 DOM diff， 给旧 DOM 进行“补丁升级”。

## 什么是高阶组件

- 高阶组件就是一个函数， 接受一个组件作为参数， 并且返回一个新的组件。

## 用过哪些全局状态管理的框架

- redux 和 mobx

## react router

- BrowserRouter/HashRouter
- Switch 决定渲染什么
- Route 做匹配
- Link   跳转

## 如何实现组件懒加载

`React.lazy(() => import('././component.ts'))`

## 如何做组件加载过程中统一的 Loading

`<Suspense fallback={<Loading />}></Suspense>`

## hooks

### React Hooks 怎么用？ useEffect 返回值？依赖值？

- useEffect
  - 不设置第二个参数的时候， 监控所有的 state 的变化。相当于 componentDidMount 和 componentDidUpdate
  - 返回一个箭头函数的时候， 用于组件卸载时执行。相当于 componentWillUnmount。（组建依赖项更新时也会被调用， 更新的执行， 相当于卸载了。 想切换更新时的例子）
  - 第二个参数不为空的时候，表示仅对该 state 进行监控。
  - 第二个参数为空数组的时候，相当于 componenntDidMount，仅仅在初始化的时候执行。
  - useState 函数内组件参数。

### useEffect 与 useLayoutEffect

React 提供了两个钩子函数来在组件渲染之后触发副作用：useEffect 和 useLayoutEffect。(注意是浏览器渲染以后)

useEffect 是一个高阶函数，它接受一个回调函数作为参数，在组件渲染之后调用该回调函数，并且在组件卸载时进行清理工作。

useLayoutEffect 与 useEffect 类似，它也接受一个回调函数作为参数，并在组件渲染之后调用该回调函数，并且在组件卸载时进行清理工作。

不同之处在于 useLayoutEffect 会在浏览器更新布局之前执行，而 useEffect 会在浏览器更新画面之后执行。

这意味着 useLayoutEffect 可以在更新之前访问 DOM 节点的布局信息，而 useEffect 则需要等到浏览器更新画面之后才能访问。

因此，useLayoutEffect 通常用来处理需要立即获取 DOM 布局信息或者需要在 DOM 布局更新之前触发操作的场景，比如动画，高度计算等。

总结，useEffect 和 useLayoutEffect 都是用来处理副作用，但是 useLayoutEffect 会在浏览器更新布局之前执行，而 useEffect 会在浏览器更新画面之后执行。

### useMemo
- 它是用于react渲染过程中的性能优化。
适用于： 父组件要进行更新，子组件的重新render计算量比较大，而且结果可以复用。就可以使用useMemo来提升父组件引起子组件不必要渲染的性能优化。
useMemo：返回计算得到的值。

- 但是不是所有地方都要用。 不得已的时候才会用
  - useMemo本身有性能消耗， 缓存消耗内存， useMemo自身维护也是有性能开销的
  - 增加开发成本， 维护困难
  - api可能会被取消

- React.memo
可以阻止父组件渲染引起的子组件（组件本身）更新。

### useCallback
对函数引用的缓存
useCallback：返回缓存的函数。

### useRef
- 获取dom实例
- forwardRef
  - 实际上函数式组件没有ref， 需要用forwardRef转发出去

### useContext
跨组件传值
- 核心是父组件用Provider包裹， 给所有子组件注入上下文
- 子组件通过useContext拿到value

### useTransition
- 演示react真正意义比vue厉害的地方（用于性能提升）
- 特性： 并发更新（fiber架构）


### 并发更新
- fiber架构 -> 指的是一种数据结构 （深度优先遍历）
  - 底层： 三个属性：child parent sibling
- 分片更新

- 浏览器的空闲时间
  
  - react并发更新的作用：
    - 给予fiber数据结构， 进行细粒度的任务拆分
    - 在浏览器空闲时间执行， requestIdleCallback的思想。
    - 因为requestIdleCallback兼容性不好， 所以目前使用PostMessage去模拟实现的。它是宏任务的异步。


### useDeferredValue
- 将任务处理为低优先级的任务

### useTransition 和 useDeferredValue 有什么区别？
- 一般useDeferredValue比较适合组件接收的props参数导致渲染缓慢的优化
- useTransition 适合在自己组件内部/本身进行优化

### useId
-  react组件渲染过程中生成一个ID
-  这个ID是根据react组件树的位置相关， 不是随机的， 每次生成都一样
  
- 为什么不能用随机数？
- 因为nodejs做react的服务端渲染时， 需要确保node端生成的id和前端一样

### useImperativeHandle
- 作用： 自定义转发出去的ref（与ref一起使用的）
- 应用场景： 不希望开发者直接操作dom， 你用我给你提供的方法就好

## Next.js
- Next.js 是一个基于 React 的服务端渲染框架，提供了许多开箱即用的功能，如路由、数据获取、静态生成等。
- 它的核心特性包括：
  - **文件系统路由**：通过在 pages 目录下创建文件来定义路由。
  - **静态生成和服务端渲染**：支持在构建时生成静态页面或在请求时动态渲染页面。
  - **API 路由**：可以在 pages/api 目录下创建 API 路由。
  - **CSS 和样式支持**：内置对 CSS 和 Sass 的支持。
  - **自动代码分割**：每个页面只加载所需的 JavaScript 和 CSS。

### Next.js 的数据获取方法
- **getStaticProps**：在构建时获取数据，适用于静态生成的页面。
- **getServerSideProps**：在每次请求时获取数据，适用于服务端渲染的页面。
- **getStaticPaths**：与 getStaticProps 一起使用，用于生成动态路由的静态页面。

### Next.js 的路由系统
- Next.js 使用文件系统路由，任何在 pages 目录下的文件都会自动成为一个路由。

### app和pages的区别
- **pages**：传统的 Next.js 路由系统，使用 pages 目录来定义路由。
- **app**：新的路由系统，提供更灵活的布局和数据获取方式，支持嵌套路由和更细粒度的页面控制。

### Next.js 的部署方式
- Next.js 应用可以部署到多种平台，如 Vercel、Netlify、AWS 等。它支持静态导出和服务端渲染，可以根据需要选择合适的部署方式。

### Nextjs ssr工作原理
- Next.js 的服务端渲染（SSR）工作原理是，当用户请求一个页面时，Next.js 会在服务器上执行该页面的代码，包括数据获取和组件渲染，然后将生成的 HTML 返回给客户端。这样可以确保页面在加载时就包含了所需的数据，提高了首屏加载速度和 SEO 性能。

- 用户访问/about
- Nextjs服务端收到请求， 调用pages/about.js中的组件
- 如果页面定义了`getServerSideProps`，Next.js 会在服务器上执行该函数获取数据。
- 拿到props后， nextjs会应用React（server render）来生成HTML字符串
- 服务端讲HTML与预渲染的props以<script>标签的形式返回给浏览器
- 浏览器收到HTML后直接展示，同时加载_app.js,React,页面组件等JS进行hydration
- hydration：浏览器将预渲染的HTML与React组件进行绑定，使得页面变为可交互的状态。

### hydration原理
- React 在浏览器端用和服务端相同的组件树“重新渲染”一次，但不会操作 DOM，而是把虚拟 DOM 和现有的真实 DOM 进行对比。
- React 检查服务端生成的 DOM 结构和客户端渲染的虚拟 DOM 是否一致。
- 然后为这些 DOM 元素“挂载”事件监听、状态等，使页面变得可交互。
- React 在服务器渲染的 HTML 中添加特殊属性（如 data-reactroot、data-reactid），用于标识节点与 React 组件的映射关系。这些属性在 Hydration 后会被移除。
