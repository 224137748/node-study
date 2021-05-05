const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true
});

const connect = mongoose.connection;

connect.on('error', () => {
  console.error('连接数据库失败');
});
console.log('33');