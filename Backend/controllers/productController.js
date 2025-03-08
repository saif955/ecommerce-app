import Product from "../models/Products.js";
import asynchandler from "express-async-handler";


const getProducts = asynchandler(async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: "Please create product" })
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
        res.status(201).json(product)
    }
    else {
        res.status(400)
        throw new Error("Product not found")
    }


})



const updateProduct = asynchandler(async (req, res) => {
    const { id } = req.params
    const updatedProduct = req.body
    const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true })
    if (product) {
        res.status(200).json(product)
    }
    else {
        res.status(400)
        throw new Error("Product not found")
    }


})



const deleteProduct = asynchandler(async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Product deleted" })
    } catch (error) {
        res.status(500).json({ message: "Product not found" })
    }


})

export { getProducts, setProduct, updateProduct, deleteProduct }