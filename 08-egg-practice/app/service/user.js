'use strict';

const Service = require('egg').Service;

class UserService extends Service {


  /**
   * 创建用户
   * @param {*} payload 
   */
  async create(payload) {
    const { ctx } = this;
    console.log('password', payload.password);
    payload.password = await this.ctx.genHash(payload.password);
    console.log('password', payload.password);
    return ctx.model.User.create(payload);
  }


  /**
   *
   * 根据手机号查找用户
   * @param {*} mobile
   * @return {*} 
   * @memberof UserService
   */
  async findByMobile(mobile) {
    return this.ctx.model.User.findOne({ mobile: mobile });
  }


  /**
   * 通过id查找用户
   *
   * @param {*} _id
   * @return {*} 
   * @memberof UserService
   */
  async find(_id) {
    return this.ctx.model.User.findById(_id);
  }

  async index(payload) {
    const { currentPage, pageSize, search, isPaging } = payload;
    let res = [];
    let count = 0;
    const skip = (Number(currentPage) - 1) * Number(pageSize || 10);

    // 需要翻页
    if (isPaging) {
      if (search) {
        res = await this.ctx.model.User.find({ mobile: { $regex: search } }).populate('role').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec();
        count = res.length;
      } else {
        res = await this.ctx.model.User.find({}).populate('role').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec();
        count = await this.ctx.model.User.count({}).exec();
      }
    } else {
      if (search) {
        res = await this.ctx.model.User.find({ mobile: { $regex: search } }).populate('role').sort({ createdAt: -1 }).exec();
        count = res.length;
      } else {
        res = await this.ctx.model.User.find({}).populate('role').sort({ createdAt: -1 }).exec();
        count = await this.ctx.model.User.count({}).exec();
      }
    }

    // 整理数据源 -> Ant Design Pro
    let data = res.map((e, i) => {
      const jsonObject = Object.assign({}, e._doc);
      jsonObject.key = i;
      jsonObject.password = 'Are you ok?';
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt);
      return jsonObject;
    });

    return { count: count, list: data, pageSize: Number(pageSize), currentPage: Number(currentPage) };
  }
}

module.exports = UserService;