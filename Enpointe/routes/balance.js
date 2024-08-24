const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Transaction= require('../models/transaction'); 
const User = require('../models/user'); 
const sequelize = require('../sequelize'); 
const authenticateToken = require('../middleware/authenticateToken'); 

router.get('/', authenticateToken, async (req, res) => {
    try {
      
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ balance: user.balance });
    } catch (err) {
      console.error('Error fetching balance:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
