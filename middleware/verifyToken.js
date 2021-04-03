const jwt = require("jsonwebtoken");

async function auth(req,res, next){
    const token = req.header("auth-token");
    if(!token){
        return res.status(401).json({error:"you must be sign in"});
    };

    try {
        const verified = await jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = verified;
        console.log(verified);
        next();
    } catch (error) {
        res.status(400).json({error: "you must be sign in"});
    }
}

module.exports = auth;