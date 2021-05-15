'use strict';

const dayjs = require('dayjs');

exports.formatTime = time => dayjs(time).format('YYYY-MM-DD HH:mm:ss');

exports.success = ({ ctx, res = null, msg = '请求成功' }) => {
  console.log(222);
  ctx.body = {
    code: 0,
    data: res,
    msg,
  };
};

