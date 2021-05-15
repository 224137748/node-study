'use strict';

const Controller = require('egg').Controller;

/**
 * @Conntroller 用户鉴权
 */
class UserAccessController extends Controller {

  /**
   * @summary 用户登入
   * @description 用户登入
   * @router post /auth/jwt/login
   * @request body loginRequest *body/
   * @response 200 baseResponse 登录成功
   */
  async login() {
    const { ctx, service } = this;

    // 校验参数
    ctx.validate(ctx.rule.loginRequest);

    // 组装参数
    const payload = ctx.request.body || {};

    // 调用service方法
    const res = await service.userAccess.login(payload);

    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 用户登出
   * @description 用户退出登录
   * @router post /auth/jwt/logout
   * @request body loginRequest *body
   * @response 200 baseResponse 成功退出
   */
  async logout() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    const res = await service.userAccess.logout(payload);
    ctx.helper.success({ ctx, res });
  }
}

module.exports = UserAccessController;
