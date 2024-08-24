const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const {generateAccessToken, generateRefreshToken} =  require('../util/generateToken')
const users = require('../models/user')


router.post('/customer', async (req, res) => {
  return await login(req,res,"customer");
});

router.post('/banker', async (req, res) => {
  return await login(req,res,"banker");
});


async function login(req,res,usertype) {
  try {
    console.log(req.body);
    
    if (!req.body.username) {
      console.log('Username is undefined in the request body!');
      return res.status(400).json({ error: "Username is required!" });
    }

    const user = await users.findOne({ where: { username: req.body.username } });

    if (user) {
      console.log("User found");

      if (user.password === req.body.password) { 

        
        if (user.usertype !== usertype) {
          console.log(`User is not a ${usertype}!`);
          return res.status(403).json({ error: `Access denied: Not a ${usertype}` });
        }

        const accessToken = generateAccessToken(user);
        console.log('Login successful. Sending response:', { accessToken: accessToken, usertype: user.usertype });

        return res.json({ accessToken: accessToken, usertype: user.usertype });
      } else {
        console.log('Wrong credentials!');
        return res.status(400).json({ error: "Wrong credentials" });
      }
    } else {
      console.log('User Not found!');
      return res.status(404).json({ error: "User Not found!" });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = router;