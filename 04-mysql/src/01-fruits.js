const { Sequelize } = require('sequelize');

(async function () {

  // 建立连接
  const sequelize = new Sequelize('kaikeba', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false
  });

  // 测试连接
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  // 定义模型
  const Fruit = sequelize.define('Fruit', {
    // 在这里定义模型属性
    name: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    stock: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  }, {
    // 这是其他模型参数
    getterMethods: {
      amount() {
        return this.getDataValue('stock') + 'Kg';
      }
    },
    setterMethods: {
      amount(val) {
        const idx = val.indexOf('kg');
        const v = val.slice(0, idx);
        this.setDataValue('stock', v);
      }
    }

  });

  // 同步数据库. 
  // 强制同步：创建表之前先删除已存在的表
  let ret = await Fruit.sync({ force: true });
  console.log('sync', ret);

  ret = await Fruit.create({
    name: '香蕉',
    price: 3.5
  });
  console.log('create', ret);

  // 查询
  // ret = await Fruit.findAll();
  // console.log('findAll', ret);

  // 更新
  // await Fruit.update({ price: 8 }, {
  //   where: {
  //     name: '香蕉'
  //   }
  // });


  ret = await Fruit.findAll();
  console.log('findAll', ret);

  Fruit.findAll().then(fruit => {
    fruit[0].amount = '150kg';
    fruit[0].save();
  }).then(async () => {

    ret = await Fruit.findAll();
    console.log('findAll', ret[0].amount);

  });


  // console.log('findall2', JSON.stringify(ret));

})();