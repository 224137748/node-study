module.exports = {
  db: {
    dialect: 'mysql',
    host: 'localhost',
    database: 'egg_demo',
    username: 'root',
    password: '123456'
  },
  middleware: ['logger']
}