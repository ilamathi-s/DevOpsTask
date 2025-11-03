import express from "express";
import { searchProduct } from "../controllers/simpleSearch.js";
import { searchCategory } from "../controllers/simpleSearch.js";
import { searchProducts} from "../controllers/searchController.js";
const router = express.Router();
router.get("/search", searchProducts);
router.get("/searchCategory/:categoryName", searchCategory);
router.get("/searchProduct/:productName", searchProduct);
export default router;