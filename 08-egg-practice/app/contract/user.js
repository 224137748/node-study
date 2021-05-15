'use strict';

module.exports = {
  createUserRequest: {
    mobile: {
      type: 'string',
      required: true,
      description: '手机号',
      example: '19908323221',
      format: /^1[358974]\d{9}$/
    },
    password: {
      type: 'string',
      required: true,
      description: '密码',
      example: '123456'
    },
    realName: {
      type: 'string',
      required: true,
      description: '真实姓名',
      example: '张三'
    }
  }
};