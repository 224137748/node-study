const http =require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')



// const add = (x, y) => x+ y
// const squarr = z  => z*z
// const fn = (x, y) => squarr(add(x,y))

// console.log(fn(1,2))

// ==============================================================

// const compose = (fn1, fn2) => (...args) => fn1(fn2(...args))
// console.log(compose(squarr,add)(1,2))


// ==============================================================


// 此中间件为同步的, 我们希望每个函数都是异步的
// const compose = (...[first, ...others]) =>(...args) => {
//   let ret = first(...args)
//   others.forEach(fn => {
//     ret = fn(ret)
//   })
//   return ret
// }


// ==============================================================



// function compose(middlewares) {
//   return function() {
//     return dispatch(0)
//     function dispatch(index) {
//       let fn = middlewares[index]
//       if (fn) {
//         return Promise.resolve(fn(function next(){
//           // promise完成后，执行下一个
//           return dispatch(index+1)
//         }))
//       } else {
//         return Promise.resolve()
//       }
//     }

//   }
// }


// async function fn1(next) {
//   console.log('fn1')
//   await next()
//   console.log('fn1 end')
//   return Promise.resolve('ok')

// }

// async function fn2(next) {
//   console.log('fn2')
//   await next()
//   console.log('fn2 end')
// }

// async function fn3(next) {
//   console.log('fn3')
//   await next()
//   console.log('fn3 end')
// }

// const middlewares = [fn1, fn2, fn3]

// compose(middlewares)().then((res) => {
//   console.log(555, res)
// })

class KKB {

  constructor() {
    this.middlewares = []
  }

  createContext(req, res) {
    const ctx = Object.create(context)
    ctx.request = Object.create(request)
    ctx.response = Object.create(response)
    ctx.req = ctx.request.req = req
    ctx.res = ctx.response.res = res
    return ctx
  }

  use(middleware) {
    this.middlewares.push(middleware)
  }


  listen(...arg) {
    const server = http.createServer(async (req, res) => {
      const ctx = this.createContext(req, res)
      const fn = this.compose(this.middlewares)
      
      await fn(ctx)

      console.log('send data ' + ctx.body)
      res.end(ctx.body)
    })

    server.listen(...arg)
  }

  

compose(middlewares) {
  return async function(ctx) {
    return dispatch(0)
    function dispatch(index) {
      let fn = middlewares[index]
      if (fn) {
        return Promise.resolve(fn(ctx, function next(){
          // promise完成后，执行下一个
          return dispatch(index+1)
        }))
      } else {
        return Promise.resolve()
      }
    }

  }
}
}

module.exports = KKB