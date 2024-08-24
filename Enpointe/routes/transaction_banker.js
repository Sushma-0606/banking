const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Transaction= require('../models/transaction'); 
const authenticateBankerToken = require('../middleware/authenticateBankerToken'); 

router.get('/:userId', authenticateBankerToken, async (req, res) => {
    try {
        const transactions = await Transaction.findAll({ where: { userId: req.params.userId } });
        console.log(transactions);
        res.json(transactions); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" }); 
    }
});
    

module.exports = router;