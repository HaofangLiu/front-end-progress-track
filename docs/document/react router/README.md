React router

# react router

# react-router 和 react-router-dom这个库的区别？
react-router-dom（浏览器专用）内部实际上依赖react-router这个库的。

# 如何实现组件懒加载
`React.lazy(() => import('././component.ts'))`

# 如何做组件加载过程中统一的 Loading
`<Suspense fallback={<Loading />}></Suspense>`

# 单页面和多页面的区别

## 多页面
- 多页面实际就是多个html， 通过window.location相互跳转
- 缺点：每个页面跳转都要刷新， 重新加载资源， 性能比较慢
- 优点： seo 友好， c端， 隔离性好， 每一个页面是一个独立的项目

## 单页面
- 好处：在一个html中进行路由跳转，实际上是通过js去控制的。代表性的框架react/vue。比较适合B端的项目，不考虑SEO。 
- 页面跳转不用刷新，性能会好一些，用户体验也能好，可以实现代码复用。
- 缺陷： SEO不好


## BrowserRouter（99%）
- 后台做一些配置
- 问题： browserRouter在使用的时候会遇到404的问题/BrowserRouter配置过程中有没有遇到过一些坑？
需要后台配合，否则会出现404的问题。
服务端使用：
1. 正则匹配
2. 通配符
![browrouter](./brow1.png)
![browrouter](./brow2.png)

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));

function Bpp () {
  return (
    <h1>bpp</h1>
  )
}

root.render(
  <BrowserRouter basename='pc'>
    <Routes>
      <Route path="/app" element={<App />} />
      <Route path="/bpp" element={<Bpp />} />
    </Routes>
  </BrowserRouter>
);

```

## HashRouter
- 了解即可，非必要不要使用这种方式
缺陷：
1. 很丑
2. 后期要改造服务端渲染很不方便

## MemoryRouter
内存型路由
应用场景： 单测
```
import * as React from "react";
import { create } from "react-test-renderer";
import {
  MemoryRouter,
  Routes,
  Route,
} from "react-router-dom";

describe("My app", () => {
  it("renders correctly", () => {
    let renderer = create(
      <MemoryRouter initialEntries={["/users/mjackson"]}>
        <Routes>
          <Route path="users" element={<Users />}>
            <Route path=":id" element={<UserProfile />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
```

## NativeRouter
```
import * as React from "react";
import { NativeRouter } from "react-router-native";

function App() {
  return (
    <NativeRouter>
      {/* The rest of your app goes here */}
    </NativeRouter>
  );
}
```

## StaticRouter
静态路由

```
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import http from "http";

function requestHandler(req, res) {
  let html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      {/* The rest of your app goes here */}    </StaticRouter>
  );

  res.write(html);
  res.end();
}

http.createServer(requestHandler).listen(3000);
```
