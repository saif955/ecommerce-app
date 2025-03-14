import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRoutes.js"
import productRouter from "./routes/productRoutes.js"
import connectDB from "./config/db.js";
import cartRouter from "./routes/cartRoutes.js"
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)

connectDB().then(() => {

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
