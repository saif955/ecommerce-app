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
            priceSnapshot: {
                type: Number,
                required: true,
            },
        },
    ],
    
    modifiedAt: {
        type: Date,
        default: Date.now,
    },
},    
{
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
}
);

cartSchema.virtual("total").get(function () {
    return this.items.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0);
});

export default mongoose.model("Cart", cartSchema);