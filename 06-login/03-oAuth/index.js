const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const querystring = require('querystring');
const axios = require('axios');

const app = new Koa();
const router = new Router();

app.use(static(__dirname + '/'));

const config = {
  client_id: '6c5747022542317d75d0',
  client_secret: '65ab35374a05115dec94750983ee829ec81c8c4c'
};


router.get('/github/login', async ctx => {
  const dataStr = (new Date()).valueOf();

  // 重定向到认证接口，并配置参数
  let path = "https://github.com/login/oauth/authorize";
  path += '?client_id=' + config.client_id;

  // 重定向
  ctx.redirect(path);
});


router.get('/auth/github/callback', async ctx => {
  console.log('callback...');
  const code = ctx.query.code;
  const params = {
    client_id: config.client_id,
    client_secret: config.client_secret,
    code
  };

  const res = await axios.post('https://github.com/login/oauth/access_token', params);
  console.log('res ==>>>', res.data);
  const access_token = querystring.parse(res.data).access_token;

  // github 已经却笑query登录方式
  const userInfo = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  console.log('userAccess', userInfo.data);
  ctx.body = `
    <h1>hello ${userInfo.data.login}</h1>
    <img src="${userInfo.data.avatar_url}" alt=""/>
  `;
});


app.use(router.routes());
app.use(router.allowedMethods());

app.listen(7001);