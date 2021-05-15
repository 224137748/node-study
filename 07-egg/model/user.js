const Sequelize = require('sequelize');

module.exports = {
  schema: {
    name: Sequelize.STRING
  },
  options: {
    timesramps: false
  }
};