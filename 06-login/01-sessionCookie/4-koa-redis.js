const Koa = require('koa');
const Router = require('koa-router');
const session = require('koa-session');
const redisStore = require('koa-redis');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const wrapper = require('co-redis');
const redis = require('redis');

const redisClient = redis.createClient(6379, 'localhost');
const app = new Koa();
const router = new Router();

const client = wrapper(redisClient);

// 跨域配置
app.use(cors({
  credentials: true
}));

// 配置session
app.keys = ['some scret'];
const SESS_CONFIG = {
  maxAge: 86400000,
  httpOnly: true,
  store: redisStore({ client })
};

app.use(static(__dirname + '/'));
app.use(bodyParser());

// 注册session
app.use(session(SESS_CONFIG, app));


// 登录鉴权
app.use(async (ctx, next) => {
  if (ctx.url.includes('login')) {
    next();
  } else {
    const sessionId = ctx.session.sessionId;

    if (sessionId) {
      const userInfo = await client.get(sessionId);

      if (userInfo) {
        ctx.userInfo = JSON.parse(userInfo);
        next();
      } else {
        ctx.body = {
          message: '登录失败'
        };
      }
    } else {
      ctx.body = {
        message: '登录失败'
      };
    }
  }
});

router.post('/users/login', async ctx => {
  const { body } = ctx.request;
  const sessionId = (Math.random() * 99999999999).toFixed() + '';
  client.set(sessionId, JSON.stringify(body));
  console.log('res  ===> ', sessionId);
  ctx.session.sessionId = sessionId;
  ctx.body = {
    message: '登录成功'
  };
});

router.get('/users/getUser', async ctx => {
  ctx.body = {
    message: '获取数据成功',
    userInfo: ctx.userInfo
  };
});

app.use(router.routes());
app.listen(3000);
