const Koa = require('koa');
const { initRouter, initController } = require('./kkb-loader');



class Kgg {
  constructor() {
    this.$app = new Koa();
    this.$ctrl = initController();
    this.$router = initRouter(this);

    this.$app.use(this.$router.routes());
  }

  listen(port = 3000) {
    this.$app.listen(port);
  }
}

new Kgg().listen();
module.exports = Kgg;