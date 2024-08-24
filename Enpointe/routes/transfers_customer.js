const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Transaction= require('../models/transaction'); 
const User = require('../models/user'); 
const sequelize = require('../sequelize'); 
const authenticateToken = require('../middleware/authenticateToken'); 


router.post('/deposit', authenticateToken, async (req, res) => {
    return await executeTransaction(req,res,"deposit");
});

router.post('/withdrawal', authenticateToken, async (req, res) => {
    return await executeTransaction(req,res,"withdrawal");
});

async function executeTransaction(req, res, transactionType) {
  const { amount } = req.body;
  const userId = req.user.id;

  if (!amount) {
    return res.status(400).json({ error: 'Amount is required' });
  }

  
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  try {
    const result = await sequelize.transaction(async (t) => {
      
      const user = await User.findByPk(userId, { transaction: t });
      if (!user) {
        throw new Error('User not found');
      }

      
      console.log('Before transaction, user balance:', user.balance);
      console.log('Amount to process:', parsedAmount);

      
      if (transactionType === 'deposit') {
        user.balance = (user.balance || 0) + parsedAmount;
      } else if (transactionType === 'withdrawal') {
        if (user.balance < parsedAmount) {
          throw new Error('Insufficient balance');
        }
        user.balance = (user.balance || 0) - parsedAmount;
      } else {
        throw new Error('Invalid transaction type');
      }

      
      await user.save({ transaction: t });

      
      await Transaction.create(
        { transactionType, userId, amount: parsedAmount },
        { transaction: t }
      );

      
      console.log('After transaction, user balance:', user.balance);

      return user;
    });

    res.status(200).json({ message: 'Transaction successful', user: result });
  } catch (error) {
    console.error('Transaction error:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = router;
