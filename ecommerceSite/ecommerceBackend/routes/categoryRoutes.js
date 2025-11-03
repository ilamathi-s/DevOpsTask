import express from "express";
import { categoryUpload,category } from "../controllers/categories.js";
const router = express.Router();
router.post("/upload/categories", categoryUpload);
router.get("/categories",category);
export default router;
