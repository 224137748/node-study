'use strict';

const Service = require('egg').Service;

class ActionTokenService extends Service {
  async apply(_id) {
    const { ctx } = this;

    return ctx.app.jwt.sign({
      data: {
        // eslint-disable-next-line no-dupe-keys
        _id, _id,
      },
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
    }, ctx.app.config.jwt.secret);
  }
}

module.exports = ActionTokenService;