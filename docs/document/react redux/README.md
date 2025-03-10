1. 我为什么要用 Redux ？
   Redux 帮助你管理“全局”状态 - 那些应用程序的许多部分都需要的状态。

Redux 提供的模式和工具使你更容易理解应用程序中的状态何时、何地、为什么以及如何更新，以及当这些更改发生时你的应用程序逻辑将如何表现。 Redux 指导你编写可预测和可测试的代码，这有助于让你确信你的应用程序将按预期工作。

2. 我什么时候应该用 Redux ？
   Redux 可帮助你处理共享状态的管理，但与任何工具一样，它也有权衡。有更多的概念需要学习，还有更多的代码需要编写。它还为你的代码添加了一些额外代码，并要求你遵循某些限制。这是短期和长期生产力之间的权衡。

Redux 在以下情况下更有用：

在应用的大量地方，都存在大量的状态
应用状态会随着时间的推移而频繁更新
更新该状态的逻辑可能很复杂
中型和大型代码量的应用，很多人协同开发

3. Redux 库和工具
   Redux 是一个小型的独立 JS 库。 但是，它通常与其他几个包一起使用：

- React-Redux
  Redux 可以结合任何 UI 框架一起使用，最常与 React。React-Redux 是我们的官方库。它让 React 组件与 Redux 有了交互，可以从 store 读取一些 state，可以通过 dispatch actions 来更新 store。

- Redux Toolkit
  Redux Toolkit 是我们推荐的编写 Redux 逻辑的方法。 它包含我们认为对于构建 Redux 应用程序必不可少的包和函数。 Redux Toolkit 构建在我们建议的最佳实践中，简化了大多数 Redux 任务，防止了常见错误，并使编写 Redux 应用程序变得更加容易。

4. Redux Store
   所有 Redux 应用的中心都是 store 。"store" 是保存应用程序的全局 state 的容器。

   store 是一个 JavaScript 对象，具有一些特殊的功能和能力，使其与普通的全局对象不同：

   切勿直接修改（modify）或更改（change）保存在 Redux 存储中的状态
   相反，导致状态更新的唯一方法是创建一个描述“应用程序中发生的某些事情”的普通 action 对象，然后将该 action dispatch 到 store 以告诉它发生了什么。
   当一个 action 被 dispatch 后，store 会调用根 reducer 方法，让其根据 action 和旧 state 计算出新 state
   最后，store 会通知 订阅者(subscribers) 状态已更新，以便可以使用新数据更新 UI。

5. Action

- action 是一个具有 type 字段的普通 JavaScript 对象。你可以将 action 视为描述应用程序中发生了什么的事件.

6. Reducers
   reducer 是一个函数，接收当前的 state 和一个 action 对象，必要时决定如何更新状态，并返回新状态。函数签名是：(state, action) => newState。 你可以将 reducer 视为一个事件监听器，它根据接收到的 action（事件）类型处理事件。

7. Dispatch
   Redux store 有一个方法叫 dispatch。更新 state 的唯一方法是调用 store.dispatch() 并传入一个 action 对象。 store 将执行所有 reducer 函数并计算出更新后的 state，调用 getState() 可以获取新 state

8. Redux 的意图可以总结为三个原则
   全局应用状态保存在单个 store 中
   store 中的 state 是只读的
   Reducer 函数用于更新状态以响应 actions
   Redux 使用“单向数据流”
   State 描述了应用程序在某个时间点的状态，UI 基于该状态渲染
   当应用程序中发生某些事情时：
   UI dispatch 一个 action
   store 调用 reducer，随后根据发生的事情来更新 state
   store 通知 UI state 发生了变化
   UI 基于新 state 重新渲染

9. Selectors
   Selector 函数可以从 store 状态树中提取指定的片段。随着应用变得越来越大，会遇到应用程序的不同部分需要读取相同的数据，selector 可以避免重复这样的读取逻辑

10. react-redux

- Redux stores 可以和任何 UI 层一起使用
  - UI 代码始终订阅 store 以获取最新的 state，并自行重绘
- React-Redux 是 React 的官方 Redux UI 绑定库
  - React-Redux 作为单独的 react-redux 包安装
- useSelector hook 使得 React 组件能够从 store 中读取数据
  - selector 函数将整个 store state 作为参数，并根据该 state 返回一个值
  - useSelector 调用它的 selector 函数并返回 selector 返回的结果
  - useSelector 订阅 store，并在每次 dispatch action 时重新运行 selector
  - 每当 selector 结果发生变化时，useSelector 将强制组件使用新数据重新渲染
- useDispatch hook 使得 React 组件能够向 store dispatch action
  - useDispatch 返回实际的 store.dispatch 函数
  - 你可以根据需要在组件内部调用 dispatch(action)
- <Provider> 组件使其他 React 组件可以和 store 进行交互
  - 使用 <Provider store={store}> 组件包裹 <App>

11. redux async fetch data

- Redux middleware 旨在支持编写具有副作用的逻辑
  - “副作用”是指更改函数外部 state 或行为的代码，例如 AJAX 调用、修改函数参数或生成随机值
- middleware 为标准 Redux 数据流增加了一个额外的步骤
  - middleware 可以拦截传递给 dispatch 的其他值
  - middleware 可以访问 dispatch 和 getState，因此它们可以作为异步逻辑的一部分 dispatch 更多 action
- Redux “Thunk” middleware 使得可以传递函数给 dispatch
  - “Thunk” 函数让我们可以提前编写异步逻辑，而不需要知道当前使用的 Redux store
  - Redux thunk 函数接收 dispatch 和 getState 作为参数，并且可以 dispatch 诸如“此数据是从 API 响应中接收到的”之类的 action
