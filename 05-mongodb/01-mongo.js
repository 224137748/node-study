(async () => {
  const { MongoClient } = require('mongodb');
  const client = new MongoClient('mongodb://root:123456@localhost:27017', {
    userNewUrlParser: true
  });

  let ret;

  // 创建链接
  ret = await client.connect();

  const db = client.db('test');

  const fruits = db.collection('fruits');

  // 添加文档
  ret = await fruits.insertOne({
    name: '苹果',
    price: '12313'
  });
  console.log('插入成功', JSON.stringify(ret));

  // 查询文档
  ret = await fruits.findOne();
  console.log('查询文档', ret);


  // 更新文档
  ret = await fruits.updateOne({ name: '苹果' }, { $set: { name: '芒果', price: 12 } });
  console.log('更新文档', JSON.stringify(ret));

  // 删除文档
  ret = await fruits.deleteOne({ name: '苹果' });

  // 删除集合
  ret = await fruits.deleteMany();


  // db.createUser({ user: "root", pwd: "123456", roles: [{ role: "root", db: "admin" }] });

})()