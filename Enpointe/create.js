const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const users = require('../models/user');

// Route for creating a new user
router.post('/create', async (req, res) => {
  try {
    const { username, email, password, usertype } = req.body;
    console.log('req.body==>',req.body)

    // Validate input fields
    if (!username || !email || !password || !usertype) {
      return res.status(400).json({ error: "All fields (username, email, password, usertype) are required!" });
    }

    // Check if the username or email already exists
    const existingUser = await users.findOne({ 
      where: { 
        [Op.or]: [
          { username: username },
          { email: email }
        ] 
      } 
    });

    if (existingUser) {
      return res.status(409).json({ error: "Username or email already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    console.log("====")
    const newUser = await users.create({
      username,
      email,
      password: hashedPassword,
      usertype
    });

    return res.status(201).json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
