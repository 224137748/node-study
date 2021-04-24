class Router {
  constructor() {
    this.stack = []
  }

  register(path, method, middleware) {
    this.stack.push({ path,method,middleware})
  }

  get(path, middleware) {
    this.register(path, 'GET', middleware)
  }

  post(path, middleware) {
    this.register(path, 'POST', middleware)
  }

  routes() {
    let stack = this.stack
    return async function(ctx, next) {
      let currentPath = ctx.url
      console.log(ctx.url, ctx.req.method)
      let route

      for (let i = 0; i < stack.length; i++) {
        let item = stack[i]
      console.log(item.path)

        if (item.path === currentPath && item.method === ctx.req.method) {
            route = item.middleware
            break
        }
      }

      // 如果route是一个函数类型，则执行中间件
      if (typeof route === 'function') {
        route(ctx, next)
        return 
      }

      // 否则，直接运行下一个中间件
      await next()
      console.log('route run end')
    }
  }
}

module.exports = Router