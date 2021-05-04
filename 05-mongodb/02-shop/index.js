const express = require('express');
const path = require('path');
const app = express();
const mongo = require('./model/db');

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./index.html'));
});

app.get('/api/list', async (req, res) => {
  const { page, keyword, category } = req.query;

  try {
    // 条件查询
    const col = mongo.col('fruits');
    const total = await col.find().count();
    const condition = {};
    if (keyword) {
      // condition.name = { $regex: new RegExp(keyword) }
      condition.name = new RegExp(keyword);
    }
    if (category) {
      condition.category = category;
    }
    const fruits = await col.find(condition).skip((page - 1) * 5).limit(5).toArray();
    res.json({
      ok: 1,
      data: {
        fruits,
        pagination: {
          total,
          page
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// 查看种类
app.get('/api/category', async (req, res) => {
  const col = mongo.col('fruits');
  const data = await col.distinct('category');
  res.json({
    ok: 1,
    data
  });
});
app.listen(3000, () => {
  console.log('server has started at 3000');
});