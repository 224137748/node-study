const Sequelize = require("sequelize");
const config = require("./config");

const sequlize = new Sequelize(
  config.database,
  config.username,
  config.passwrod,
  {
    dialect: "mysql",
    host: config.host,
    operatorsAliases: false,
  }
);

module.exports = sequlize;
