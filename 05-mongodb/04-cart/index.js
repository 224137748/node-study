const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = new express();

console.log(11);
// 数据库相关
require('./mongoose');
console.log(22);

const UserModel = require('./models/user.js');
// mock session
const session = { sid: { userId: '5c1a2dce951e9160f0d8573b' } };

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./index.html'));
});

// 查看购物车数据
app.get('/api/cart', async (req, res) => {
  console.log(55);
  const data = await UserModel.getCart(session.sid.userId);
  res.send({ ok: 1, data });
});

app.post('/api/cart', async (req, res) => {
  await UserModel.setCart(session.sid.userId, req.body.cart);
  res.send({ ok: 1 });
});

app.listen(3000);