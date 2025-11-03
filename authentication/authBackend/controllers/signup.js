import bcrypt from "bcrypt";
import dotenv from "dotenv";
import db from "../config/db.js";
dotenv.config();
export const signup = async (req,res) => {
    const {firstName, lastName, emailId, createPass, confirmPass} = req.body;
     if (!firstName || !lastName || !emailId || !createPass || !confirmPass) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if(createPass !== confirmPass)
    {
        return res.status(400).json({error: "Password do not match"});
    }
    const hashedPass = await bcrypt.hash(createPass , 10);
    const query = "INSERT INTO Users (firstName, lastName, emailId, password) VALUES (?, ?, ?, ?)";
    db.query(
        query,
        [firstName,lastName,emailId,hashedPass],
        (err) => {
            if(err)
            {
                console.error(err);
                return res.status(400).json({error:"Email already exist"});
            }
            return res.status(201).json({message:"Signed Up Successfully"});
        }
    );
}
