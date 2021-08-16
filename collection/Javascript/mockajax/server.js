const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  // console.log(req.url);
  const base = "http://localhost:8888/";
  let urlObj = new URL(req.url, base);

  if (urlObj.pathname === "/getWeather") {
    res.end(JSON.stringify({ data: "raining" }));
  } else {
    res.end(fs.readFileSync(__dirname + "/index.html"));
  }

  // console.log(urlObj);
  // res.end("hello work");
});

server.listen(8888);

console.log('open "8888"');
