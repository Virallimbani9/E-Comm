const jwt = require("jsonwebtoken");


const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1]; 
        jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
            if(err) res.status(403).json("TOKEN IS NOT VALID!!!!!!!")

            req.user = user;
            next();
        });
    }else{
        return res.status(401).json("U R NOT AUTHENTICTED!!!!!!!")
    }
}

const verifyTokenAndAuth = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json("U R NOT ALLOW TO DO THAT!!!!!");
        }
    })
}

module.exports = {verifyToken,verifyTokenAndAuth};  