import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../config/db.js";
dotenv.config();
export const signin = (req,res) => {
    const {emailId,password} = req.body;
    const JWT_KEY = process.env.JWT_SECRET;
    const query = "SELECT * FROM Users WHERE emailId = ?";
    db.query(query, [emailId],async (err,result) => {
        if(err)throw err;
        if(result.length === 0)
        {
            return res.status(404).json({error:"User not found"});
        }
        const user = result[0];
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)
            return res.status(400).json({error:"Invalid"});
        const token = jwt.sign(
            {email:user.emailId
            },
            JWT_KEY,
            { expiresIn: "1h" }
        );
        res.json({
            message:"Sign in Successful",
            token,
            firstName: user.firstName,
            lastName:user.lastName,
            emailId:user.emailId
        });
    });
}
