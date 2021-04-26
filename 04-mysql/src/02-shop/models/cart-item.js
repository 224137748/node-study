const Sequelize = require("sequelize");

const sequelize = require("../utils");

const CartItem = sequelize.define("cartItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allwoNull: false,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = CartItem;
