const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema({

    title: { type: String, require: true, },
    descriptoin: { type: String, require: true, unique: true },
    img: { type: String, require: true },
    categorise: { type: Array, require: true },
    size: { type: String, require: true },
    color: { type: String, require: true },
    price: { type: Number, require: true },
});

module.exports = mongoose.model("Product", ProductSchema);