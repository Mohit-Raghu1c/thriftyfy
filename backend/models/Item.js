const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    title: String,

    price: Number,

    brand: String,

    size: String,

    condition: Number,

    color: String,

    category: String,

    description: String,

    type: {
        type: String,
        enum: ["sell", "donate"],
        default: "donate"
    },

    images: [
        {
            url: String,
            public_id: String,
        }
    ],

    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
    }
});

module.exports = mongoose.model("Item", itemSchema);