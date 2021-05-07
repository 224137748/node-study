// 强缓存

function updateTime() {
  setInterval(() => {
    this.time = new Date().toUTCString();
  }, 1000);
  return this.time;
}


const http = require('http');
http.createServer((req, res) => {
  const { url } = req;
  if (url === '/') {
    res.end(`
      <html>
        Html update Time ${updateTime()}
        <script src="main.js"></script>
      </html>
    `);
  } else if (url === '/main.js') {
    // 设置强缓存
    // http: 1.0 依赖于客户端本地时间，不准确
    res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toUTCString());

    // http: 1.1 依赖服务器时间
    res.setHeader('Cache-Control', 'max-age=20');

    // ctrl + f5强制刷新，刷新掉的是 强缓存

    res.statusCode = 200;
    res.end(`
      document.writeln('<br> JS Update Time: ${updateTime()}')
    `);
  } else if (url === '/favicon.ico') {
    res.end();
  }
}).listen(3000, () => {
  console.log('Server has run at 3000');
});

// 结论：