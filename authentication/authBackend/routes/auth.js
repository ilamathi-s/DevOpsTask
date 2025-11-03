import express from "express";
import { signin } from "../controllers/signin.js";
import { signup } from "../controllers/signup.js";
const router = express.Router();
router.post("/signup",signup);
router.post("/signin",signin);
export default router;