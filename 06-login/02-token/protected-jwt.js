// 受保护 的jwt
// 权限控制, 根据请求的url判断，是否需要鉴权

var Koa = require('koa');
var jwt = require('koa-jwt');
// var _jwt = require('jsonwebtoken');

// console.log(_jwt.sign({
//   data: '123456',
// }, 'shared-secret'));

var app = new Koa();

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function (ctx, next) {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  });
});

// Unprotected middleware
app.use(function (ctx, next) {
  if (ctx.url.match(/^\/public/)) {
    ctx.body = 'unprotected\n';
  } else {
    return next();
  }
});

// Middleware below this line is only reached if JWT token is valid
app.use(jwt({ secret: 'shared-secret' }));

// Protected middleware
app.use(function (ctx) {
  console.log(ctx.state);
  if (ctx.url.match(/^\/api/)) {
    ctx.body = 'protected\n';
  }
});

app.listen(3000);