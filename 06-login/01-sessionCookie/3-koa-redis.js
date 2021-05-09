const koa = require('koa')
const session = require('koa-session')
const redis = require('redis')
const redisStore = require('koa-redis')
const app = new koa()
const redisClient = redis.createClient(6379, 'localhost')

const wrapper = require('co-redis')
const client = wrapper(redisClient)



// 签名key 用来对cookie签名
app.keys = ['some secret']

// 配置项
const SESS_CONFIG = {
  /** cookie 键名 */
  key: 'kkb:sess',

  /** 有效期，默认一天 */
  maxAge: 86400000,

  /** 仅服务器修改 */
  httpOnly: true,

  /** 签名cookie */
  signed: true,

  /** 此处不必指定client */
  store: redisStore({client})
}

// 注册
app.use(session(SESS_CONFIG, app))


app.use(async (ctx, next) => {
  const keys = await client.keys('*')
  console.log('keys ===>>>', keys)
  keys.forEach(async key => {
      console.log(await client.get(key))
  });

  await next()
})



app.listen(3000)