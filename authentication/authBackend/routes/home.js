import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/home",verifyToken,(req,res) => {
    res.json({message: `Welcome ${req.user.email}!`});
});
export default router;