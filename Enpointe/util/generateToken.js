const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    console.log("inside generate access token", user);

    const tokenData = {
        id: user.id,
        username: user.username,
        usertype: user.usertype, 
    };

    const expiresIn = 2 * 60 * 60; 

    return jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
}


function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}

module.exports = {generateAccessToken, generateRefreshToken}