import mongoose from "mongoose";
import Product from "./Products.js";
import User from "./Users.js";

const Schema = mongoose.Schema;

const cartSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index : true
    },
    items: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true,
                validate: {
                    validator: async function (productId) {
                        const product = await Product.findById(productId);
                        return product !== null;
                    },
                    message: "Invalid product ID",
                }
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, "Quantity must be at least 1"],
                default: 1
            },
        },
    ],
    total: {
        type: Number,
    },
    modifiedAt: {
        type: Date,
        default: Date.now,
    },
},    
{
    timestamps: true
}
);

export default mongoose.model("Cart", cartSchema);