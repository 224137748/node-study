const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const Sequelize = require('sequelize');
const schedule = require('node-schedule');
const { middleware } = require('./config/config');

function loader(dir, cb) {
  const url = path.resolve(__dirname, dir);

  const files = fs.readdirSync(url);

  files.forEach(file => {
    const filename = file.replace('.js', '');

    cb(filename, require(path.resolve(__dirname, dir, filename)));
  });

}


function initRouter(app) {
  const router = new Router();

  loader('routes', (filename, routes) => {

    const prefix = filename === 'index' ? '' : `/${filename}`;
    routes = typeof routes === 'function' ? routes(app) : routes;

    Object.keys(routes).forEach(key => {
      const [method, routePath] = key.split(' ');
      const path = prefix ? (prefix + (routePath === '/' ? '' : routePath)) : routePath;

      // 这里要做一下优化，因为routes为function内部接收参数为app，routes为对象的时候会，内接受的参数是ctx， 所以为了保持一致，要优化一下
      // 使得 routes类型为function和object两种方式都适配
      router[method](path, async ctx => {
        app.ctx = ctx;
        await routes[key](app);
      });
    });
  });
  return router;
}

function initController(app) {
  const controlers = {};
  loader('controller', (filename, control) => {
    controlers[filename] = control(app);

  });
  return controlers;
}


function initServer(app) {
  const server = {};
  loader('server', (filename, service) => {
    server[filename] = service(app);
  });
  return server;
}

function loadConfig(app) {
  loader('config', (filename, conf) => {
    if (conf.db) {
      app.$db = new Sequelize(conf.db);

      // 加载模型
      app.$model = {};
      loader('model', (filename, { schema, options, middleware }) => {
        app.$model[filename] = app.$db.define(filename, schema, options);
      });

      if (middleware) {
        middleware.forEach(mid => {
          const midpath = path.resolve(__dirname, 'middleware', mid);
          app.$app.use(require(midpath));
        });
      }
      app.$db.sync();
    }
  });
}

function initSchedule() {
  loader('schedule', (filename, scheduleConfig) => {
    schedule.scheduleJob(scheduleConfig.interval, scheduleConfig.handler);
  });
}

module.exports = {
  initRouter,
  initController,
  initServer,
  loadConfig,
  initSchedule
};