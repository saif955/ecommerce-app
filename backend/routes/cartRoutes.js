import { getCart, addToCart, removeFromCart, updateCartItem, clearCart } from "../controllers/cartController.js";
import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.delete('/:productId', protect, removeFromCart);
router.put('/:productId', protect, updateCartItem);
router.delete('/', protect, clearCart);

export default router;