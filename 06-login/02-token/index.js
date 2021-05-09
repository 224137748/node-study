const Koa = require('koa');
const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const jwtAuth = require('koa-jwt');
const secret = `it's a scret`;
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');

const app = new Koa();
const router = new Router();

app.keys = ['some scret'];
app.use(cors({
  credentials: true
}));


app.use(static(__dirname + '/'));
app.use(bodyParser());



router.use(jwtAuth({ secret }), (ctx, next) => {
  console.log('', ctx.state);
  next()
    .then(() => {
      console.log('success');
    })
    .catch(err => {
      if (401 == err.status) {
        ctx.status = 401;
        ctx.body = 'Protected resource, use Authorization header to get access\n';
      } else {
        throw err;
      }
    });
});


router.post('/users/login-token', ctx => {
  const { body } = ctx.request;
  const userinfo = body.username;

  ctx.body = {
    message: '登录成功~！',
    user: userinfo,
    token: jwt.sign({
      data: userinfo,
      // 设置过期时间，一小时后，秒为单位
      exp: Math.floor(Date.now() / 1000) + 60 * 60
    },
      secret
    ),
  };
});


router.get('/users/getUser-token', ctx => {
  // 验证通过， state.user
  console.log('33333333333333, ', ctx.state);
  ctx.body = {
    message: '获取数据成功',
    userinfo: ctx.state.user.data
  };

});


app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
