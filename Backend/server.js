import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js"
import productRouter from "./routes/productRoutes.js"
import connectDB from "./config/db.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)


connectDB().then(() => {

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

