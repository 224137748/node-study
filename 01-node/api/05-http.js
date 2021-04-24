const http = require("http");
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

const server = http.createServer((req, res) => {
  const { url, method, headers } = req;
  if (url === "/" && method === "GET") {
    readFile("./index.html")
      .then((data) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      })
      .catch((err) => {
        res.writeHead(500, {
          "Content--Type": "text/plain;charset=utf-8",
        });
        res.end("500, 服务器错误");
      });
  } else if (url === "/users" && method === "GET") {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify([{ name: "tom", age: 20 }]));
  } else if (headers.accept.indexOf("image/*") !== -1) {
    fs.createReadStream("." + url).pipe(res);
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain;charset=utf-8");
    res.end("404,页面没有找到");
  }
});

server.listen(3000);
