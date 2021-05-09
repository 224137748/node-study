const http = require('http')

// 内存中设置缓存session
const session = {}

http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    res.end('')
    return 
  }

  // 观察 cookie是否存在
  console.log('cookie',req.headers.cookie)

  const sessionkey = 'sid'
  const cookie = req.headers.cookie
  if (cookie && cookie.indexOf(sessionkey) > -1) {
    res.end('Come Back')
    const pattern = new RegExp(`${sessionkey}=([^;]+);?\s*`)
    const sid = pattern.exec(cookie)[1]
    console.log('session', sid, session[sid])
  } else {
    const sid = (Math.random() * 99999999).toFixed()

    // 设置cookie
    res.setHeader('Set-Cookie', `${sessionkey}=${sid}`)

session[sid] = {name: 'zhangsan'}
res.end('hello ')
  }

  res.end('hello cookie')


}).listen(3000, () => {
  console.log('server has started at 3000')

})