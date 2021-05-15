module.exports = (app) => ({
  index: async (ctx) => {
    // const name = await app.$server.user.getName();
    // app.ctx.body = '首页222 name=' + name;

    app.ctx.body = await app.$model.user.findAll();
  },
  detail: () => {
    const age = app.$server.user.getAge();
    app.ctx.body = '详情页面222   年纪：' + age;
  }
});

