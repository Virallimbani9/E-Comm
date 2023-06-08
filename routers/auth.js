const router = require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.get("/t",(req,res)=>{
    res.send("hiiii")
})

router.post("/register",async(req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });
    // console.log(newUser);
    
    try{
        const savedUser = await newUser.save()
        res.status(201).send(savedUser);
    }catch(err){
        res.status(500).send(err);
    }
});

//LOG IN 

router.post("/login",async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username});
        !user && res.status(401).json("NOT A ACCOUNT!!!!!");

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC); 
        // console.log(hashedPassword);
        const Opassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        
        if(Opassword !== req.body.password)
        {
        res.status(401).end("WORNG!!!!!");
            }else{
                const acessToken = jwt.sign({
                    id : user._id,
                    isAdmin : user.isAdmin,
        
                },process.env.JWT_SEC,
                {expiresIn:"10d"}
                );
        
                const {password, ...others} = user._doc;
                res.status(200).json({...others,acessToken});
            }
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router; 


