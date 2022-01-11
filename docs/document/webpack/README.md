# webpack

## entry

- 假如希望有多个文件，就可以写这里
- 入口起点(entry point) 指示 webpack 应该使用哪个模块，来作为构建其内部依赖图(dependency graph) 的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

## Loaders

- webpack 只能理解 js 和 json 文件，loader 让 webpack 能去处理其他类型的文件，并将它们转换成有效的模块，以供程序使用，以及被添加到依赖图中
- loader 的两个属性： test（识别出哪个文件会被转换） use（定义在进行转换时，应该使用哪个 loader）
- style-loader 把 CSS 插入到 DOM 中。
- css-loader css-loader 会对@import 和 url()进行处理，就像 js 解析 import/require()一样。

### 常见的 loader

- file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
- url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
- source-map-loader：加载额外的 Source Map 文件，以方便断点调试
- image-loader：加载并且压缩图片文件
- babel-loader：让 babel 来处理最新的 js(ts、jsx)语法
- css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
- style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。

## plugins

- 插件用于执行范围更广的任务。比如：打包优化，资源管理，注入环境变量等（目的在于解决 loader 无法实现的其他的事情）
- CleanWebpackPlugin 构建前清理/dist 文件夹。（现在推荐 output.clean 配置而不是插件）
- HtmlWebpackPlugin 为应用程序生成一个 HTML 文件，并自动注入所有生成的 bundle。

### 常见的 plugin

- HtmlWebpackPlugin: 用于创建最终使用的 HTML 文件。可自动生成，也可以使用模版创建。
- UglifyjsWebpackPlugin: 用于压缩 js 文件
- TerserWebpackPlugin：用于压缩 js，更新，支持 es6 语法
- ExtractTextWebpackPlugin: 将所有的入口 chunk 中引用的 \*.css，移动到独立分离的 CSS 文件

## Loader 和 Plugin 有什么差别

Loader 直译为"加载器"。Webpack 将一切文件视为模块，Loader 让 Webpack 拥有了加载和解析非 JavaScript 文件的能力。

Plugin 直译为"插件"。Plugin 可以扩展 Webpack 的功能。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

## sourcemap

- 在编译后的代码和源码进行一个 mapping

## devtool

- 此选项控制是否生成，以及如何生成 source map。

## webpack-dev-server

- 提供了一个基本的 web server，并且具有 live reloading(实时重新加载) 功能

## MHR

- 模块热替换，开发过程中，可以让某个模块保持状态，但是模块产生更新
- 它允许在运行时更新所有类型的模块，而无需完全刷新。

## compiler | compilation

- compiler 对象代表一个完全配置的 webpack 环境
- compilation 对象代表对版本资源的单次构建

## Webpack 的构建流程是什么

初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；

开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；

确定入口：根据配置中的 entry 找出所有的入口文件；

编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；

完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；

输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；

输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

## 有哪些代码分离的方法

入口起点：使用 entry 配置手动地分离代码。

防止重复：使用 CommonsChunkPlugin 去重和分离 chunk。

动态导入：代码中通过懒加载 import().then 分离代码。

## 什么是 tree shaking

移除 JavaScript 上下文中的未引用代码(dead-code)

## 如何利用 Webpack 来优化前端性能

- tree shaking 移除 dead-code，减小文件提及
- js、css 压缩合并，图片压缩或者内联，html 压缩
- 抽离公共的 js 或者 css
- 模块懒加载

## 如何提高 Webpack 的构建速度

- 优化 loader 配置，配置 test 、 include 、 exclude
- terser-webpack-plugin，开启缓存和多进程压缩
- thread-loader 为每个 loder 开辟单独的进程
- cache-loader 给 loader 设置缓存

## 打包文件大怎么解决

- 使用生产环境
- 压缩合并
- treeshaking
- 抽离公共的文件
- 模块懒加载


# babel
## babel-loader有什么作用
- 把最新的JS语法或者JSX转化为ES5，需要babel转

## @babel/core 有什么作用
- 转换语法，需要配合插件使用

## @babel/preset-env 有什么作用
- 把最新标准的js转化成es5

## @babel/preset-react 有什么作用
- 把jsx变成js

## 什么是插件，什么是预设
预设就是多个插件配置在一起（带有preset都是预设）
插件就是core需要用来解析的工具
可以在babel.rc里面进行配置

## 其他

# 聊一聊性能优化
- 加载优化 ---文件小，数目少，压缩合并， 服务端开启gzip， 静态资源用CDN，服务器配置缓存）懒加载 tree-shaking 采用HTTP2
- 渲染优化 ---repaint reflow， 尽量少的dom操作
- 滚动（操作）优化 ---懒加载，请求少。 节流，防抖的优化。 DOM的复用
- 动画的优化 ---尽量css3， 多用transform（这里是利用显存）
- 构建（打包）的优化 ---打包时间
