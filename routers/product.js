const Product = require("../models/Product");
const { verify } = require("jsonwebtoken");
const { verifyToken,verifyTokenAndAuth } = require("./vtoken");
const router = require("express").Router();

// CREATE

router.post("/",verifyTokenAndAuth,async(req,res)=>{
    const newProduct = new Product(req.body);

    try{
        const saveProduct = await newProduct.save();
        res.status(200).json(saveProduct);
    }catch(err){
        res.status(500).json(err);  
    }
})


//UPDATE

router.put("/:id",verifyTokenAndAuth, async(req,res)=>{

try{
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
        $set : req.body,
    },{new:true});
    res.status(200).json(updatedProduct)
}catch(err){res.status(500).json(err)}
})

// DELETE

router.delete("/:id",verifyTokenAndAuth,async(req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("DELETED PRODUCT!!!!!!!!!!");
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET 

router.get("/find/:id", async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id);

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET ALL PRODUCTS

router.get("/" , async (req,res)=>{
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;
        if(qNew){
            products = await Product.find().sort({createdAt:-1}).limit(1) 
        }else if(qCategory) {
            products = await Product.find({
                categorise:{
                    $in :[qCategory],
                }
            })
        }else{
            products = await Product.find()
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;
