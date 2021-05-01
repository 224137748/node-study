const Sequelize = require('sequelize');

const sequelize = require('../utils');

const HistoryItem = sequelize.define('historyItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allwoNull: false,
  }
});

module.exports = HistoryItem;