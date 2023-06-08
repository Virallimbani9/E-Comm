const { default: mongoose } = require("mongoose");

const OrderSchema = new mongoose.Schema({

    userid: { type: String, require: true, },
    product: [
        {
            productId: { type: String },
            quantity: { type: Number, default: 1 },

        },
    ],
    amount: { type: Number, require: true },
    address: { type: Object, require: true },
    status: { type: String, default: "PENDING" }
});

module.exports = mongoose.model("Order", OrderSchema);