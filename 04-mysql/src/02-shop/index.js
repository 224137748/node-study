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

// 所属关系
Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});

User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {
  through: CartItem,
});
Product.belongsToMany(Cart, {
  through: CartItem,
});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {
  through: OrderItem,
});
Product.belongsToMany(Order, {
  through: OrderItem,
});

// 加载用户 - 代替鉴权，即用户登陆身份id
app.use(async (ctx, next) => {
  // 选择id为1的用户
  const user = await User.findByPk(1);
  console.log("get__user", user);
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
  const res = await ctx.user.createProduct(body);
  ctx.body = {
    success: true,
  };
});

// router.delete('/admin/product/:id', async (ctx, next) => {

// })

app.use(router.routes());

sequelize.sync().then(async () => {
  let user = await User.findByPk(1);
  if (!user) {
    user = await User.create({
      name: "Sorry",
      email: "224137748@qq.com",
    });
    await use.createCart();
  }

  app.listen(3000, () => {
    console.log("listen to prot 3000");
  });
});
