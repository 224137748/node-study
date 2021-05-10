const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

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
      router[method](path, routes[key]);
    });
  });
  return router;
}

function initController() {
  const ctx = {};
  loader('controller', (filename, file) => {
    ctx[filename] = {};
    Object.keys(file).forEach(key => {
      ctx[filename][key] = file[key];
    });
    console.log(ctx);
  });
  return ctx;
}

module.exports = {
  initRouter,
  initController
};