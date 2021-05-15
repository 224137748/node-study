'use strict';


const Controller = require('egg').Controller;

/**
 *
 * @controller 用户管理
 */
class UserController extends Controller {


  /**
   * @summary 创建用户
   * @description 创建用户，记录用户账户，密码，类型
   * @router post /api/user
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.createUserRequest);
    const payload = ctx.request.body || {};
    const res = await service.user.create(payload);
    ctx.helper.success({ ctx, res });
  }



  /**
   * @summary 获取用户列表
   * @description 获取用户列表
   * @router get /api/user
   * @request query integer *currentPage eg:1 当前页
   * @request query integer *pageSize eg:10 单页数量
   * @request query string search eg: 搜索字符串
   * @request query boolean isPaging eg:true 是否需要翻页
   * @response 200 baseResponse 请求成功
   */
  async index() {
    const { ctx, service } = this;
    const query = ctx.query;
    const res = await service.user.index(query);
    ctx.helper.success({ ctx, res });

  }
}


module.exports = UserController;
