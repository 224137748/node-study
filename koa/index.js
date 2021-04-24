const KKB = require('./kkb');
const app = new KKB();
const Router = require('./kkb/router')
const router = new Router()

const delay = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};


app.use(async (ctx, next) => {
  if (ctx.req.url === '/favicon.ico') return
   await next()
})

router.get('/index', async ctx => {
  console.log('index,xx');
  ctx.body = 'index page';
});
router.get('/post', async ctx => {
  ctx.body = 'post page';
});
router.get('/list', async ctx => {
  console.log('list')
  ctx.body = 'list page';
});
router.post('/index', async ctx => {
  ctx.body = 'post page';
});





// app.use(async (ctx, next) => {
//   const { url } = ctx.req;
//   if (url === '/favicon.ico') return;

//   await next()

//   console.log('step 1 start');
//   ctx.body += '你好世界'
//   console.log('step 1 end');
// });

// app.use(async (ctx, next) => {
//   ctx.body = "1";
//   await next();
//   ctx.body += "5";
// });
// app.use(async (ctx, next) => {
//   ctx.body += "2";
//   await delay();
//   await next();
//   ctx.body += "4";
// });

// app.use(async (ctx, next) => {
//   ctx.body += "3";
// });


// ==================================================

app.use(async (ctx, next) => {
  console.log('test1 sync start')
  await next()
  ctx.body = '1313'
  console.log('text1 sync end')
})



app.use(async (ctx, next) => {
  console.log('test2 sync start')
  await delay()
  await next()
  console.log('text2 sync end')
})

// console.log(app.middlewares)
// 此版本router 后面的中间件不会执行，所以放到最后面注册
app.use(router.routes())


app.listen(3000, () => {
  console.log('server has started');
});