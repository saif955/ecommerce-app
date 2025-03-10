import Cart from "../models/Cart.js";
import Product from "../models/Products.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// @ desc getCart
// @ route GET /api/cart
// @ access private
const getCart = asyncHandler(async (req, res) => {

    const cart = await Cart.findOne({ user: req.user._id }).populate({
        path: "items.product",
        select: "name image price"
    })
    if (!cart) {
        return res.status(200).json({ items: [], total: 0 });

    }
    res.status(200).json({ items: cart.items, total: cart.total });

})

// @ desc addToCart
// @ route POST /api/cart
// @ access private
const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid product ID format" });
    }
    // validate input
    if (!productId || !quantity || quantity < 1) {
        return res.status(400).json({ message: "Invalid product data" })
    }
    if (quantity > 10) {
        return res.status(400).json({ message: "Quantity must be less than 10" })
    }
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" })
    }
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        cart = await Cart.create({ user: req.user._id });
        cart.items = [];
    }
    //check if product in cart 
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId.toString());
    if (itemIndex > -1) {
        const newQuantity = parseInt(cart.items[itemIndex].quantity) + parseInt(quantity);
        if (newQuantity > 10) {
            return res.status(400).json({ message: "Quantity must not be greater than 10" })
        }
        cart.items[itemIndex].quantity = newQuantity;

    }
    else {
        cart.items.push({ product: productId, quantity:quantity, priceSnapshot: product.price });
    }
    const updatedCart = await cart.save();
    await updatedCart.populate("items.product")
    res.status(201).json({
        items: updatedCart.items,
        total: updatedCart.total,
    })
})

// @desc removeFromCart
// @route DELETE /api/cart/:productId
// @access private
const removeFromCart = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid product ID format" });
    }
    // validate input
    if (!productId) {
        return res.status(400).json({ message: "Invalid product data" })
    }
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        return res.status(404).json({ message: "Cart not found" })
    }
    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    const updatedCart = await cart.save();
    await updatedCart.populate("items.product");
    res.status(201).json({
        items: updatedCart.items,
        total: updatedCart.total
    })
})


// @desc updateCartItem
// @route PUT /api/cart/:productId
// @access private
const updateCartItem = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid product ID format" });
    }
    // validate input
    if (!quantity || quantity < 1|| quantity > 10) {
        return res.status(400).json({ message: "Quantity must be between 1 and 10" })
    }
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        return res.status(404).json({ message: "Cart not found" })
    }
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId.toString())
    if (itemIndex === -1) {
        res.status(404).json({ message: "Item not found in cart" })
    }
    cart.items[itemIndex].quantity = quantity;
    const updatedCart = await cart.save();
    await updatedCart.populate("items.product");
    res.status(201).json({
        items: updatedCart.items,
        total: updatedCart.total
    })
})

const clearCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        return res.status(404).json({ message: "Cart not found" })
    }
    cart.items = [];
    const updatedCart = await cart.save();
    await updatedCart.populate("items.product");
    res.status(201).json({
        items: updatedCart.items,
        total: updatedCart.total
    })
})

export { getCart, addToCart, removeFromCart, updateCartItem, clearCart }