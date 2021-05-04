const mongodb = require('./model/db');
mongodb.once('connect', async () => {
  const col = mongodb.col('fruits');

  await col.deleteMany();

  const data = new Array(100).fill().map((v, i) => ({
    name: 'xxx' + i,
    price: i,
    category: Math.random() > 0.5 ? '蔬菜' : '水果'
  }));

  await col.insertMany(data);
  console.log('插入数据成功');
});