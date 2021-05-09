const koa = require('koa')
const app = new koa()
const session = require('koa-session')
const redis = require('redis')

const client = redis.createClient(6379, 'localhost')


client.get('hello', function(err, val) {
  console.log('redis get ', val)
})

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
  signed: true
}

// 注册
app.use(session(SESS_CONFIG, app))

// 测试 
app.use(ctx => {
  if (ctx.path === '/favicon.ico') return

  let n = ctx.session.count || 0

  ctx.session.count = ++n
  ctx.body = `第 ${n} 次访问`

})

app.listen(3000)