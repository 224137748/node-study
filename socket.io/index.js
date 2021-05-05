var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./index.html'));
});


io.on('connection', function (socket) {
  console.log('a user connected');

  // 响应用户发送的信息
  socket.on('chat message', function (msg) {
    console.log('chat message', msg);

    // 广播给所有人
    io.emit('chat message', msg);

  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('server has started');
});
