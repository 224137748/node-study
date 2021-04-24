const http = require("http");
const fs = require("fs");
const path = require("path");
const bodyParser = require("./bodyParser");

http
  .createServer((req, res) => {
    const { method, url } = req;
    console.log(url, method);
    console.log("cookie", req.headers.cookie);

    if (method === "GET" && url === "/") {
      fs.readFile(path.resolve(__dirname, "./index.html"), (err, data) => {
        if (err) {
          console.log(err);
          res.statusCode = 500;
          res.end("err");
        }
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      });
    } else if (
      (method === "GET" || method === "POST") &&
      url === "/api/users"
    ) {
      res.setHeader("Access-Control-Allow-Credentials", "true");

      res.setHeader("Content-Type", "application/json");
      // 设置跨域响应头
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
      res.setHeader("Set-Cookie", "cookie1=888888;");

      res.end(JSON.stringify({ name: "tom", age: 18 }));
    } else if (method === "OPTIONS" && url === "/api/users") {
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Set-Cookie", "cookie1=va222;");
      // 配置预检请求
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Headers": "X-Token,Content-Type",
        "Access-COntrol-Allow-Menthods": "PUT,POST",
      });
      res.end();
    } else if (method === "POST" && url === "/api/save") {
      bodyParser(req).then((data) => {
        console.log("save data", data);
        res.end("get data" + data);
      });
    }
  })
  .listen(4000, () => {
    console.log("server has started");
  });
