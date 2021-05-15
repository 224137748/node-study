'use strict';

const Service = require('egg').Service;

class UserAccessService extends Service {
  async login(payload) {
    const { ctx, service } = this;
    const user = await service.user.findByMobile(payload.mobile);
    if (!user) {
      ctx.throw(404, 'user not found');
    }

    // 比较密码
    const verifyPsw = await ctx.compare(payload.password, user.password);
    if (!verifyPsw) {
      ctx.throw(404, 'user password is error');
    }

    // 登录成功，生成token
    return { token: await service.actionToken.apply(user._id) };
  }

  async logout() {
    // 退出登录
    // 产生疑问，jwt这种方式服务端退出登录时需要做处理嘛？
  }

  async current() {
    const { ctx, service } = this;
    // jwt 获取后
    const _id = ctx.state.user.data._id;
    const user = await service.user.find(_id);
    if (!user) {
      ctx.throw(404, 'user is not found');
    }
    user.password = 'How old you are';
    return user;
  }
}

module.exports = UserAccessService;