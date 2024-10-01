(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{383:function(e,t,a){e.exports=a.p+"assets/img/life.06bed6e2.png"},404:function(e,t,a){"use strict";a.r(t);var s=a(45),v=Object(s.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"react-知识点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#react-知识点"}},[e._v("#")]),e._v(" React 知识点")]),e._v(" "),s("h2",{attrs:{id:"严格模式的作用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#严格模式的作用"}},[e._v("#")]),e._v(" 严格模式的作用")]),e._v(" "),s("ol",[s("li",[e._v("不安全的生命周期方法：某些生命周期方法在未来的 React 版本中将被弃用。严格模式会警告这些不安全的方法的使用。")]),e._v(" "),s("li",[e._v("使用过时或遗留的 API：严格模式会警告使用过时或遗留的 API。")]),e._v(" "),s("li",[e._v("意外的副作用：严格模式可以帮助你发现组件中可能的意外副作用。")]),e._v(" "),s("li",[e._v("与旧版本 React 不兼容的代码：严格模式会警告你的代码中可能与未来版本的 React 不兼容的部分。")])]),e._v(" "),s("h2",{attrs:{id:"react-和-reactdom-两个包分别有什么作用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#react-和-reactdom-两个包分别有什么作用"}},[e._v("#")]),e._v(" React 和 ReactDom 两个包分别有什么作用？")]),e._v(" "),s("ol",[s("li",[e._v("react：这是 React 库的核心。它定义了 React 组件的创建和生命周期方法，以及 React 元素的概念。你可以将其视为 React 的“引擎”。")]),e._v(" "),s("li",[e._v("react-dom：这个库提供了在浏览器环境中使用 React 的方法，例如将 React 组件渲染到 DOM 中，或者在 DOM 中触发 React 组件的更新。你可以将其视为 React 的“驱动程序”。")])]),e._v(" "),s("h2",{attrs:{id:"生命周期有哪些"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#生命周期有哪些"}},[e._v("#")]),e._v(" 生命周期有哪些？")]),e._v(" "),s("p",[s("img",{attrs:{src:a(383),alt:"life cycle"}})]),e._v(" "),s("ul",[s("li",[s("p",[e._v("static getDerivedStateFromProps(props, state)")]),e._v(" "),s("ul",[s("li",[e._v("如果你定义了 static getDerivedStateFromProps，React 会在初始挂载和后续更新时调用 render 之前调用它。它应该返回一个对象来更新 state，或者返回 null 就不更新任何内容。")]),e._v(" "),s("li",[e._v("props：组件即将用来渲染的下一个 props。")]),e._v(" "),s("li",[e._v("state：组件即将渲染的下一个 state。")])])]),e._v(" "),s("li",[s("p",[e._v("getSnapshotBeforeUpdate(prevProps, prevState)")]),e._v(" "),s("ul",[s("li",[e._v("render 以后， 只会在更新的时候执行")]),e._v(" "),s("li",[e._v("如果你实现了 getSnapshotBeforeUpdate，React 会在 React 更新 DOM 之前时直接调用它。它使你的组件能够在 DOM 发生更改之前捕获一些信息（例如滚动的位置）。此生命周期方法返回的任何值都将作为参数传递给 componentDidUpdate。")])])]),e._v(" "),s("li",[s("p",[e._v("挂载时")]),e._v(" "),s("ul",[s("li",[e._v("constructor()")]),e._v(" "),s("li",[e._v("render()")]),e._v(" "),s("li",[e._v("componentDidmount()")])])]),e._v(" "),s("li",[s("p",[e._v("更新")]),e._v(" "),s("ul",[s("li",[e._v("componentDidUpdate(prevProps, prevState， snapshot?)")])])]),e._v(" "),s("li",[s("p",[e._v("卸载")]),e._v(" "),s("ul",[s("li",[e._v("componentWillUnmount()")])])])]),e._v(" "),s("h2",{attrs:{id:"为什么-setsate-有异步更新"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#为什么-setsate-有异步更新"}},[e._v("#")]),e._v(" 为什么 setSate 有异步更新")]),e._v(" "),s("ul",[s("li",[s("p",[e._v("react 在执行 setState 后需要执行 render， diff， 更新 DOM 等一些列操作， 性能开销是比较大的。 加入异步更新，更新合并等策略能优化性能。")])]),e._v(" "),s("li",[s("p",[e._v("setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。（react 为了解决跨平台，兼容性问题，自己封装了一套事件机制，代理了原生的事件，像在 jsx 中常见的 onClick、onChange 这些都是合成事件）")])]),e._v(" "),s("li",[s("p",[e._v("setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的 callback 拿到更新后的结果。")])]),e._v(" "),s("li",[s("p",[e._v("setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和 setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 setState ， setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。")])])]),e._v(" "),s("h2",{attrs:{id:"什么时候是异步更新-什么时候是同步更新"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#什么时候是异步更新-什么时候是同步更新"}},[e._v("#")]),e._v(" 什么时候是异步更新， 什么时候是同步更新")]),e._v(" "),s("ul",[s("li",[e._v("组件里面的事件处理程序， 比如"),s("code",[e._v("onClick = {handleClick}")]),e._v("里面的 setState 是异步更新， 生命周期函数里面的 setState 是异步更新。")]),e._v(" "),s("li",[e._v("其他地方， 比如"),s("code",[e._v("setTimeout")]),e._v(" 或者"),s("code",[e._v("addEventListener")]),e._v("都是同步更新。")])]),e._v(" "),s("h2",{attrs:{id:"列表渲染时为什么加-key"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#列表渲染时为什么加-key"}},[e._v("#")]),e._v(" 列表渲染时为什么加 key")]),e._v(" "),s("ul",[s("li",[e._v("dom diff 的时候用于识别原有的 dom，提升性能")])]),e._v(" "),s("h2",{attrs:{id:"受控组件与非受控组件是什么"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#受控组件与非受控组件是什么"}},[e._v("#")]),e._v(" 受控组件与非受控组件是什么")]),e._v(" "),s("ul",[s("li",[s("code",[e._v("<FInput value={x} onChange={changeValue} />")]),e._v("受控组件： 由开发者控制状态，value 等")]),e._v(" "),s("li",[s("code",[e._v("<FInput defaultValue={x} ref={input} />")]),e._v(" 非受控组件： 不由开发者控制的组件")])]),e._v(" "),s("h2",{attrs:{id:"组件间的通信"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#组件间的通信"}},[e._v("#")]),e._v(" 组件间的通信")]),e._v(" "),s("ul",[s("li",[e._v("父子组件通过 props")]),e._v(" "),s("li",[e._v("爷孙组件可以通过 Context， createContext， Provider")]),e._v(" "),s("li",[e._v("任意组件可以通过 eventBus")]),e._v(" "),s("li",[e._v("更复杂的可以通过 redux， mobx 状态管理库")])]),e._v(" "),s("h2",{attrs:{id:"shouldcomponentupdate-有什么用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#shouldcomponentupdate-有什么用"}},[e._v("#")]),e._v(" shouldComponentUpdate 有什么用")]),e._v(" "),s("ul",[s("li",[e._v("用于优化性能，假如不需要更新视图， 则可以返回 false 去不进行这次渲染。")])]),e._v(" "),s("h2",{attrs:{id:"虚拟-dom-是什么"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#虚拟-dom-是什么"}},[e._v("#")]),e._v(" 虚拟 DOM 是什么")]),e._v(" "),s("ul",[s("li",[e._v("vDom 就是我们写的 JSX， JSX 会返回一个对象包含了属性和孩子的数据对象， 也就是虚拟 DOM。 babel 会把 JSX 变成"),s("code",[e._v("Reacte.createElement")]),e._v(", 数据对象和将来要渲染到页面的 DOM 一一对应。")])]),e._v(" "),s("h1",{attrs:{id:"react-的原理是什么"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#react-的原理是什么"}},[e._v("#")]),e._v(" React 的原理是什么")]),e._v(" "),s("ul",[s("li",[e._v("babel 把 jsx 变成"),s("code",[e._v("React.createElement")]),e._v(" 把 JSX 变成一个包含属性和孩子的数据对象（Vdom，通过 render 方法渲染成真正的 DOM 放在页面上，当 setState 时重新执行 render， 进行 DOM diff， 给旧 DOM 进行“补丁升级”。")])]),e._v(" "),s("h2",{attrs:{id:"什么是高阶组件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#什么是高阶组件"}},[e._v("#")]),e._v(" 什么是高阶组件")]),e._v(" "),s("ul",[s("li",[e._v("高阶组件就是一个函数， 接受一个组件作为参数， 并且返回一个新的组件。")])]),e._v(" "),s("h2",{attrs:{id:"用过哪些全局状态管理的框架"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#用过哪些全局状态管理的框架"}},[e._v("#")]),e._v(" 用过哪些全局状态管理的框架")]),e._v(" "),s("ul",[s("li",[e._v("redux 和 mobx")])]),e._v(" "),s("h2",{attrs:{id:"react-router"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#react-router"}},[e._v("#")]),e._v(" react router")]),e._v(" "),s("ul",[s("li",[e._v("BrowserRouter/HashRouter")]),e._v(" "),s("li",[e._v("Switch 决定渲染什么")]),e._v(" "),s("li",[e._v("Route 做匹配")]),e._v(" "),s("li",[e._v("Link   跳转")])]),e._v(" "),s("h2",{attrs:{id:"如何实现组件懒加载"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#如何实现组件懒加载"}},[e._v("#")]),e._v(" 如何实现组件懒加载")]),e._v(" "),s("p",[s("code",[e._v("React.lazy(() => import('././component.ts'))")])]),e._v(" "),s("h2",{attrs:{id:"如何做组件加载过程中统一的-loading"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#如何做组件加载过程中统一的-loading"}},[e._v("#")]),e._v(" 如何做组件加载过程中统一的 Loading")]),e._v(" "),s("p",[s("code",[e._v("<Suspense fallback={<Loading />}></Suspense>")])]),e._v(" "),s("h2",{attrs:{id:"hooks"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#hooks"}},[e._v("#")]),e._v(" hooks")]),e._v(" "),s("h3",{attrs:{id:"react-hooks-怎么用-useeffect-返回值-依赖值"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#react-hooks-怎么用-useeffect-返回值-依赖值"}},[e._v("#")]),e._v(" React Hooks 怎么用？ useEffect 返回值？依赖值？")]),e._v(" "),s("ul",[s("li",[e._v("useEffect\n"),s("ul",[s("li",[e._v("不设置第二个参数的时候， 监控所有的 state 的变化。相当于 componentDidMount 和 componentDidUpdate")]),e._v(" "),s("li",[e._v("返回一个箭头函数的时候， 用于组件卸载时执行。相当于 componentWillUnmount。（组建依赖项更新时也会被调用， 更新的执行， 相当于卸载了。 想切换更新时的例子）")]),e._v(" "),s("li",[e._v("第二个参数不为空的时候，表示仅对该 state 进行监控。")]),e._v(" "),s("li",[e._v("第二个参数为空数组的时候，相当于 componenntDidMount，仅仅在初始化的时候执行。")]),e._v(" "),s("li",[e._v("useState 函数内组件参数。")])])])]),e._v(" "),s("h3",{attrs:{id:"useeffect-与-uselayouteffect"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#useeffect-与-uselayouteffect"}},[e._v("#")]),e._v(" useEffect 与 useLayoutEffect")]),e._v(" "),s("p",[e._v("React 提供了两个钩子函数来在组件渲染之后触发副作用：useEffect 和 useLayoutEffect。(注意是浏览器渲染以后)")]),e._v(" "),s("p",[e._v("useEffect 是一个高阶函数，它接受一个回调函数作为参数，在组件渲染之后调用该回调函数，并且在组件卸载时进行清理工作。")]),e._v(" "),s("p",[e._v("useLayoutEffect 与 useEffect 类似，它也接受一个回调函数作为参数，并在组件渲染之后调用该回调函数，并且在组件卸载时进行清理工作。")]),e._v(" "),s("p",[e._v("不同之处在于 useLayoutEffect 会在浏览器更新布局之前执行，而 useEffect 会在浏览器更新画面之后执行。")]),e._v(" "),s("p",[e._v("这意味着 useLayoutEffect 可以在更新之前访问 DOM 节点的布局信息，而 useEffect 则需要等到浏览器更新画面之后才能访问。")]),e._v(" "),s("p",[e._v("因此，useLayoutEffect 通常用来处理需要立即获取 DOM 布局信息或者需要在 DOM 布局更新之前触发操作的场景，比如动画，高度计算等。")]),e._v(" "),s("p",[e._v("总结，useEffect 和 useLayoutEffect 都是用来处理副作用，但是 useLayoutEffect 会在浏览器更新布局之前执行，而 useEffect 会在浏览器更新画面之后执行。")]),e._v(" "),s("h3",{attrs:{id:"usememo"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#usememo"}},[e._v("#")]),e._v(" useMemo")]),e._v(" "),s("ul",[s("li",[s("p",[e._v("它是用于react渲染过程中的性能优化。\n适用于： 父组件要进行更新，子组件的重新render计算量比较大，而且结果可以复用。就可以使用useMemo来提升父组件引起子组件不必要渲染的性能优化。\nuseMemo：返回计算得到的值。")])]),e._v(" "),s("li",[s("p",[e._v("但是不是所有地方都要用。 不得已的时候才会用")]),e._v(" "),s("ul",[s("li",[e._v("useMemo本身有性能消耗， 缓存消耗内存， useMemo自身维护也是有性能开销的")]),e._v(" "),s("li",[e._v("增加开发成本， 维护困难")]),e._v(" "),s("li",[e._v("api可能会被取消")])])]),e._v(" "),s("li",[s("p",[e._v("React.memo\n可以阻止父组件渲染引起的子组件（组件本身）更新。")])])]),e._v(" "),s("h3",{attrs:{id:"usecallback"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#usecallback"}},[e._v("#")]),e._v(" useCallback")]),e._v(" "),s("p",[e._v("对函数引用的缓存\nuseCallback：返回缓存的函数。")]),e._v(" "),s("h3",{attrs:{id:"useref"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#useref"}},[e._v("#")]),e._v(" useRef")]),e._v(" "),s("ul",[s("li",[e._v("获取dom实例")]),e._v(" "),s("li",[e._v("forwardRef\n"),s("ul",[s("li",[e._v("实际上函数式组件没有ref， 需要用forwardRef转发出去")])])])]),e._v(" "),s("h3",{attrs:{id:"usecontext"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#usecontext"}},[e._v("#")]),e._v(" useContext")]),e._v(" "),s("p",[e._v("跨组件传值")]),e._v(" "),s("ul",[s("li",[e._v("核心是父组件用Provider包裹， 给所有子组件注入上下文")]),e._v(" "),s("li",[e._v("子组件通过useContext拿到value")])]),e._v(" "),s("h3",{attrs:{id:"usetransition"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#usetransition"}},[e._v("#")]),e._v(" useTransition")]),e._v(" "),s("ul",[s("li",[e._v("演示react真正意义比vue厉害的地方（用于性能提升）")]),e._v(" "),s("li",[e._v("特性： 并发更新（fiber架构）")])]),e._v(" "),s("h3",{attrs:{id:"并发更新"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#并发更新"}},[e._v("#")]),e._v(" 并发更新")]),e._v(" "),s("ul",[s("li",[s("p",[e._v("fiber架构 -> 指的是一种数据结构 （深度优先遍历）")]),e._v(" "),s("ul",[s("li",[e._v("底层： 三个属性：child parent sibling")])])]),e._v(" "),s("li",[s("p",[e._v("分片更新")])]),e._v(" "),s("li",[s("p",[e._v("浏览器的空闲时间")]),e._v(" "),s("ul",[s("li",[e._v("react并发更新的作用：\n"),s("ul",[s("li",[e._v("给予fiber数据结构， 进行细粒度的任务拆分")]),e._v(" "),s("li",[e._v("在浏览器空闲时间执行， requestIdleCallback的思想。")]),e._v(" "),s("li",[e._v("因为requestIdleCallback兼容性不好， 所以目前使用PostMessage去模拟实现的。它是宏任务的异步。")])])])])])]),e._v(" "),s("h3",{attrs:{id:"usedeferredvalue"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#usedeferredvalue"}},[e._v("#")]),e._v(" useDeferredValue")]),e._v(" "),s("ul",[s("li",[e._v("将任务处理为低优先级的任务")])]),e._v(" "),s("h3",{attrs:{id:"usetransition-和-usedeferredvalue-有什么区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#usetransition-和-usedeferredvalue-有什么区别"}},[e._v("#")]),e._v(" useTransition 和 useDeferredValue 有什么区别？")]),e._v(" "),s("ul",[s("li",[e._v("一般useDeferredValue比较适合组件接收的props参数导致渲染缓慢的优化")]),e._v(" "),s("li",[e._v("useTransition 适合在自己组件内部/本身进行优化")])]),e._v(" "),s("h3",{attrs:{id:"useid"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#useid"}},[e._v("#")]),e._v(" useId")]),e._v(" "),s("ul",[s("li",[s("p",[e._v("react组件渲染过程中生成一个ID")])]),e._v(" "),s("li",[s("p",[e._v("这个ID是根据react组件树的位置相关， 不是随机的， 每次生成都一样")])]),e._v(" "),s("li",[s("p",[e._v("为什么不能用随机数？")])]),e._v(" "),s("li",[s("p",[e._v("因为nodejs做react的服务端渲染时， 需要确保node端生成的id和前端一样")])])]),e._v(" "),s("h3",{attrs:{id:"useimperativehandle"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#useimperativehandle"}},[e._v("#")]),e._v(" useImperativeHandle")]),e._v(" "),s("ul",[s("li",[e._v("作用： 自定义转发出去的ref（与ref一起使用的）")]),e._v(" "),s("li",[e._v("应用场景： 不希望开发者直接操作dom， 你用我给你提供的方法就好")])])])}),[],!1,null,null,null);t.default=v.exports}}]);