const Cart = require("../models/Cart");
const { verify } = require("jsonwebtoken");
const { verifyToken,verifyTokenAndAuth } = require("./vtoken");
const router = require("express").Router();

// CREATE

router.post("/",verifyToken,async(req,res)=>{
    const newCart = new Cart(req.body);

    try{
        const saveCart = await newCart.save();
        res.status(200).json(saveCart);
    }catch(err){
        res.status(500).json(err);  
    }
})


//UPDATE

router.put("/:id",verifyTokenAndAuth, async(req,res)=>{

try{
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{
        $set : req.body,
    },{new:true});
    res.status(200).json(updatedCart)
}catch(err){res.status(500).json(err)}
})

// DELETE

router.delete("/:id",verifyTokenAndAuth,async(req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("DELETED CART!!!!!!!!!!");
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET 

router.get("/find/:userId",verifyTokenAndAuth, async (req,res)=>{
    try {
        const cart = await Cart.findOne({userId:req.params.userId});

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET ALL USER CART
router.get("/",verifyTokenAndAuth, async (req,res)=>{
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;
