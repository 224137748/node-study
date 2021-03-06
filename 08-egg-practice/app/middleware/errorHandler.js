'use strict';

module.exports = (option, app) => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在app上触发一个 error 事件， 框架回记录一条错误日志
      app.emit('error', err, this);

      const status = err.status || 500;

      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500 && app.config.env === 'prod' ? 'Internal Server Error' : err.message;

      ctx.body = {
        code: status,
        error,
      };

      if (status === 422) {
        ctx.body.detail = err.errors;
      }
      ctx.status = 200;
    }
  };
};