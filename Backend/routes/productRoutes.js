import express from "express";
import { getProudcts, setProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();
router.get('/', getProudcts);
router.post('/', setProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;