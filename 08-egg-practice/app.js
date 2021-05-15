'use strict';

class AppBootHook {
  constructor(app) {
    this.app = app;
    app.root_path = __dirname;
  }


  configWillLoad() {

  }

  async didReady() {
    // 初始化数据
    console.log('------------------- init ------------------');
    // const ctx = await this.app.createAnonymousContext();
    // await ctx.model.User.remove();
    // await ctx.service.user.create({
    //   mobile: '13611388415',
    //   password: '111111',
    //   realName: '老夏',
    // });
  }


}

module.exports = AppBootHook;