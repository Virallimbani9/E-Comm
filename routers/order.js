const Order = require("../models/Order");
const { verify } = require("jsonwebtoken");
const { verifyToken,verifyTokenAndAuth } = require("./vtoken");
const router = require("express").Router();

// CREATE

router.post("/",verifyTokenAndAuth,async(req,res)=>{
    const newOrder = new Order (req.body);

    try{
        const saveOrder = await newOrder.save();
        res.status(200).json(saveOrder);
    }catch(err){
        res.status(500).json(err);  
    }
})


//UPDATE

router.put("/:id",verifyTokenAndAuth, async(req,res)=>{

try{
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{
        $set : req.body,
    },{new:true});
    res.status(200).json(updatedOrder)
}catch(err){res.status(500).json(err)}
})

// DELETE

router.delete("/:id",verifyTokenAndAuth,async(req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("DELETED ORDER!!!!!!!!!!");
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET 

router.get("/find/:userId",verifyTokenAndAuth, async (req,res)=>{
    try {
        const order = await Order.findOne({userId:req.params.userId});

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET ALL USER ORDER

router.get("/",verifyTokenAndAuth, async (req,res)=>{
    try {
        const Orders = await Order.find();
        res.status(200).json(Orders);
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET MONTHLY INCOME

router.get("/income",verifyTokenAndAuth, async(req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));

    try{
        const income = await Order.aggregate([
            { $match : { createdAt : { $gte : previousMonth } } },
            {
                $project:{
                    month :{$month : "$createdAt" },
                    sales : "$amount",
                },
                    $group:{
                    _id:"$month",
                    total:{$sum:"$sales"}
                },
            },
        ]);
        res.status(200).json(income);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;
