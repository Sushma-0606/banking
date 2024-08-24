const jwt = require("jsonwebtoken");

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401); 

    const token = authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401); 

    console.log("authHeader",authHeader);
    console.log("token",token);


    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); 

        console.log("USERTYPE is here",user.usertype);
        
        if (user.usertype !== 'customer') {
            return res.status(403).json({ error: "Access denied" }); 
        }
        
        req.user = user;
        console.log("user details:", user);
        next();
    });
}

module.exports = authenticateToken;