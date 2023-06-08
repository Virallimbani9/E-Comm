const { default: mongoose } = require("mongoose");

const CartSchema = new mongoose.Schema({

    userid: { type: String, require: true, },
    product: [
        {
            productId: { type: String },
            quantity: { type: Number, default: 1 },

        },
    ],
});

module.exports = mongoose.model("Cart", CartSchema);