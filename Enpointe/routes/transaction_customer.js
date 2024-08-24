const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Transaction= require('../models/transaction'); 
const authenticateToken = require('../middleware/authenticateToken'); 

router.get('/', authenticateToken, async (req, res) => {
    try {
        
        console.log(req.user.id)
        const transactions = await Transaction.findAll({ where: { userId: req.user.id } });
        console.log(transactions);
        res.json(transactions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});
    

module.exports = router;