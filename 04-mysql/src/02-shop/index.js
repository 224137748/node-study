const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const app = new Koa();

app.use(koaStatic)(__dirname + '/');
app.use(bodyParser());

// 初始化数据库
const sequelize = require('./utils');
