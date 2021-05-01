const Koa = require("koa");
const router = require("koa-router")();
const bodyParser = require("koa-bodyparser");
const koaStatic = require("koa-static");
const app = new Koa();

app.use(koaStatic(__dirname + "/"));
app.use(bodyParser());

// 初始化数据库
const sequelize = require("./utils");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");
const History = require('./models/history');
const HistoryItem = require('./models/history-item');

// 所属关系
Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});


User.hasMany(Product);
User.hasOne(Cart);

History.belongsTo(User);
User.hasMany(History);
History.belongsToMany(Product, {
  through: HistoryItem
});
Product.belongsToMany(History, {
  through: HistoryItem
});

Cart.belongsTo(User);
Cart.belongsToMany(Product, {
  through: CartItem
});
Product.belongsToMany(Cart, {
  through: CartItem
});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {
  through: OrderItem
});
Product.belongsToMany(Order, {
  through: OrderItem
});



// 加载用户 - 代替鉴权，即用户登陆身份id
app.use(async (ctx, next) => {
  // 选择id为1的用户
  const user = await User.findByPk(1);
  await user.createHistory();
  ctx.user = user;
  await next();
});



router.get("/admin/products", async (ctx, next) => {
  const products = await Product.findAll();
  ctx.body = {
    prods: products,
  };
});

router.post("/admin/product", async (ctx, next) => {
  const body = ctx.request.body;
  console.log('body', body);
  const res = await ctx.user.createProduct(body);

  ctx.body = {
    success: true,
  };
});

router.delete('/admin/product/:id', async (ctx, next) => {
  const id = ctx.params.id;
  console.log('Product', Product);
  const res = await Product.destroy({
    where: {
      id
    }
  });
  ctx.body = { success: true };
});

router.get('/cart', async (ctx, next) => {
  const cart = await ctx.user.getCart();
  const products = await cart.getProducts();
  ctx.body = {
    products
  };
});

router.post('/cart', async (ctx) => {
  const { id } = ctx.request.body;
  const cart = await ctx.user.getCart();

  const products = await cart.getProducts({
    where: {
      id
    }
  });
  console.log('products', products);
  let product, newQty = 1;

  // 查看当前的购物车，如果没有创建过购物车则创建一个
  if (products.length > 0) {
    product = products[0];
  }
  if (product) {
    const oldQty = product.cartItem.quantity;
    newQty = oldQty + 1;
  } else {
    console.log('cart2', cart);
    product = await Product.findByPk(id);
  }

  await cart.addProduct(product, {
    through: {
      quantity: newQty
    }
  });

  ctx.body = {
    success: true
  };

});



router.post('/orders', async ctx => {
  let fetchedCart;
  const cart = await ctx.user.getCart();
  fetchedCart = cart;

  const products = await cart.getProducts();
  console.log('products', products);
  const order = await ctx.user.createOrder();
  const result = await order.addProduct(
    products.map(p => {
      p.orderItem = {
        quantity: p.cartItem.quantity
      };
      return p;
    })
  );
  await fetchedCart.setProducts(null);
  ctx.body = { success: true };

});

router.get('/orders', async ctx => {
  // 将订单的产品一并查出来
  const orders = await ctx.user.getOrders({
    include: ['products'],
    order: [['createdAt', 'DESC']]
  });

  ctx.body = { orders };

});


router.delete('/cartItem/:id', async (ctx) => {
  const cart = await ctx.user.getCart();
  const products = await cart.getProducts({
    where: {
      id: ctx.params.id
    }
  });
  const product = products[0];
  await product.cartItem.destroy();
  ctx.body = {
    success: true
  };
});
app.use(router.routes());





sequelize.sync().then(async () => {
  let user = await User.findByPk(1);
  if (!user) {
    user = await User.create({
      name: "Sorry",
      email: "224137748@qq.com",
    });
    await user.createCart();
  }

  app.listen(3000, () => {
    console.log("listen to prot 3000");
  });
});
