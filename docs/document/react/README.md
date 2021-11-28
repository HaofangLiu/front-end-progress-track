# React 知识点

## 生命周期有哪些？

- 挂载时
  - constructor()
  - render()
  - componentDidmount()
- 更新
  - componentDidUpdate()
- 卸载
  - componentWillUnmount()


## 为什么setSate有异步更新
- react 在执行setState后需要执行render， diff， 更新DOM等一些列操作， 性能开销是比较大的。 加入异步更新，更新合并等策略能优化性能。

## 什么时候是异步更新， 什么时候是同步更新
- 组件里面的事件处理程序， 比如`onClick = {handleClick}`里面的setState是异步更新， 生命周期函数里面的setState是异步更新。
- 其他地方， 比如`setTimeout` 或者`addEventListener`都是同步更新。
- 


## 列表渲染时为什么加key
- dom diff的时候用于识别原有的dom，提升性能


## 受控组件与非受控组件是什么
- `<FInput value={x} onChange={changeValue} />`受控组件： 由开发者控制状态，value等
- `<FInput defaultValue={x} ref={input} />` 非受控组件： 不由开发者控制的组件

## 组件间的通信
- 父子组件通过props
- 爷孙组件可以通过Context， createContext， Provider
- 任意组件可以通过eventBus
- 更复杂的可以通过redux， mobx状态管理库
  
## shouldComponentUpdate有什么用
- 用于优化性能，假如不需要更新视图， 则可以返回false去不进行这次渲染。 


## 虚拟DOM是什么
- vDom就是我们写的JSX， JSX会返回一个对象包含了属性和孩子的数据对象， 也就是虚拟DOM。 babel会把JSX变成`Reacte.createElement`, 数据对象和将来要渲染到页面的DOM一一对应。


# React的原理是什么
- babel把jsx变成`React.createElement` 把JSX变成一个包含属性和孩子的数据对象（Vdom，通过render方法渲染成真正的DOM放在页面上，当setState时重新执行render， 进行DOM diff， 给旧DOM进行“补丁升级”。  
## 什么是高阶组件
- 高阶组件就是一个函数， 接受一个组件作为参数， 并且返回一个新的组件。 


## 用过哪些全局状态管理的框架
- redux 和mobx

## react router
- BrowserRouter/HashRouter
- Switch 决定渲染什么
- Route 做匹配
- Link  跳转

## 如何实现组件懒加载
`React.lazy(() => import('././component.ts'))`

## 如何做组件加载过程中统一的Loading
`<Suspense fallback={<Loading />}></Suspense>`

## React Hooks怎么用？ useEffect返回值？依赖值？
- useEffect
    - 不设置第二个参数的时候， 监控所有的state的变化。相当于componentDidMount 和 componentDidUpdate
    - 返回一个箭头函数的时候， 用于组件卸载时执行。相当于componentWillUnmount
    - 第二个参数不为空的时候，表示仅对该state进行监控。
    - 第二个参数为空数组的时候，相当于componenntDidMount，仅仅在初始化的时候执行。
- useState 函数内组件参数。

