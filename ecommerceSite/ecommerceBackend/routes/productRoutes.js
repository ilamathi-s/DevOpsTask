import express from "express";
import { productUpload,productDisplay,productByCategory,allProductsPaginate } from "../controllers/products.js";
const router = express.Router();
router.post("/upload/products", productUpload);
router.get("/products",productDisplay);
router.get("/products/:categoryId", productByCategory);
router.get("/allProducts", allProductsPaginate); 
export default router;
