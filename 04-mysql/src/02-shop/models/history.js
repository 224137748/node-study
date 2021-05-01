const Sequelize = require('sequelize');

const sequelize = require('../utils');

const History = sequelize.define('history', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
});

module.exports = History;