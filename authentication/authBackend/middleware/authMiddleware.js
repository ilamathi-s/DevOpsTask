import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();
const JWT_KEY = process.env.JWT_SECRET || "";
export const verifyToken = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader)
        return res.status(403).json({error: "No token provided"});
    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token,JWT_KEY);
        req.user= decoded;
        next();
    }
    catch(err)
    {
        res.status(401).json({error:"Invalid token"});
    }
}