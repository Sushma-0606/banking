const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); 

const Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    transactionType: {
      type: DataTypes.ENUM('withdrawal', 'deposit'), 
      allowNull: false, 
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      require:true, 
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'Transactions', 
    timestamps: false,
  });
  
  module.exports = Transaction;