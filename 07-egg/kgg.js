const Koa = require('koa');
const { initRouter, initController, initServer, loadConfig, initSchedule } = require('./kkb-loader');



class Kgg {
  constructor() {
    // 挂载sequelize

    this.$app = new Koa();
    loadConfig(this);
    initSchedule();
    this.$server = initServer();
    this.$ctrl = initController(this);
    this.$router = initRouter(this);
    this.$app.use(this.$router.routes());
  }

  listen(port = 3000) {
    this.$app.listen(port);
  }
}

new Kgg().listen();
module.exports = Kgg;