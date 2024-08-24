const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("Bank", "sushma", "sushamYadav", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
