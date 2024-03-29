const User = require("../models/User");
const { verify } = require("jsonwebtoken");
const { verifyToken,verifyTokenAndAuth } = require("./vtoken");

const router = require("express").Router();


//UPDATE

router.put("/:id",verifyTokenAndAuth, async(req,res)=>{
if(req.body.password){
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
}

try{
    const updatedUser = await User.findByIdAndUpdate(req.params.id,{
        $set : req.body,
    },{new:true});
    res.status(200).json(updatedUser)
}catch(err){res.status(500).json(err)}
})

// DELETE

router.delete("/:id",verifyTokenAndAuth,async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("DELETED USER!!!!!!!!!!");
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET 

router.get("/find/:id",verifyTokenAndAuth,async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);

        const {password, ...others} = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET ALL USER

router.get("/",verifyTokenAndAuth,async(req,res)=>{
    const query = req.query.new;
    try {
        const user = query ? await User.find().sort({_id:-1}).limit(1) 
        : await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error)
    }
})


// GET USER STATS 

router.get("/stats",verifyTokenAndAuth,async(req,res)=>{
    const date = new Date();
    const lastyear = new Date(date.setFullYear(date.getFullYear() - 1));

    try{
        const data = await User.aggregate([
            { $match: { createdAt: { $gte:lastyear } } },

            {
                $project:{
                    month : { $month:"$createdAt" },
                }
            },

            {
                $group:{
                    _id:"$month",
                    total: { $sum : 1},
                },
            }
            
        ]);
        res.status(200).json(data);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;
