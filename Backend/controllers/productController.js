import Product from "../models/Products.js";
import asynchandler from "express-async-handler";
import mongoose from "mongoose";


const getProducts = asynchandler(async (req, res) => {
    try {
        const products = await Product.find({})
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({ message: "No products found" })
    }


})



const setProduct = asynchandler(async (req, res) => {
    const { name, image, price } = req.body
    if (!name || !price) {
        return res.status(400).json({
            message: "Please add all fields"
        })
    }
    const productExists = await Product.findOne({ name })
    if (productExists) {
        return res.status(400).json({
            message: "Product already exists"
        })

    }
    const product = await Product.create({
        name,
        image,
        price
    })
    if (product) {
       return res.status(201).json(product)
    }
    else {
        return res.status(400).json({ message: "Invalid product data" })
        
    }


})



// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asynchandler(async (req, res) => {
    const { id } = req.params;
    const { name, image, price } = req.body;

    // Validate input
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID format" });
    }

    if (!name || !price) {
        return res.status(400).json({ 
            message: "Please provide name and price" 
        });
    }

    // Check if product exists
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
        return res.status(404).json({ message: "Product not found" });
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, image, price },
        { 
            new: true,
            runValidators: true 
        }
    );

    res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct
    });
})



const deleteProduct = asynchandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID format" });
    }
    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({ message: "Product deleted" })
    } catch (error) {
        res.status(500).json({ message: "Product not found" })
    }


})

export { getProducts, setProduct, updateProduct, deleteProduct }
