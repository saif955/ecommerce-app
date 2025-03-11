import express from "express";
import { getProducts, setProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js"; 

const router = express.Router();
router.get('/', getProducts);
router.post('/', protect, isAdmin, setProduct);
router.put('/:id', protect, isAdmin, updateProduct);
router.delete('/:id', protect, isAdmin, deleteProduct);

export default router;