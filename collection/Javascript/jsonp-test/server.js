const http = require("http");

http
  .createServer((req, res) => {
    const urlObj = new URL(req.url, "http://localhost:8888");
    if (urlObj.pathname === "/test") {
      let data = { data: "success" };
      res.end(
        `${urlObj.searchParams.get("callback")}(${JSON.stringify(data)})`
      );
    }
  })
  .listen("8888");

// put this to where to call

//   <script>
//   function showData(data) {
//   console.log(data)
//   }
//   </script>
//   <script src="http://localhost:8888/test?callback=showData" />.


// jsonp原理

// 简单来讲就是

// 前端调用接口<script src="http://127.0.0.1:8088/jsonp?callback=test"></script>
// +后端返回test({"name": "Monkey"})
// 等同于
// <script>test({"name": "Monkey"})</script>
