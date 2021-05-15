module.exports = {
  'get /': async app => {
    app.ctx.body = '用户首页';
  },
  'get /info': async app => {
    app.ctx.body = '用户详情页面';
  },
  'get /build': async app => {
    const junrui = await app.$model.user.build({ name: 'zhangsan' });
    const res = await junrui.save();
    app.ctx.body = res;

  }
}