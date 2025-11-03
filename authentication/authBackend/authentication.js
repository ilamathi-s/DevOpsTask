import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import homeRoute from "./routes/home.js";
dotenv.config();
const app = express();
app.use(cors({
    origin: ["http://localhost:5002", "http://localhost:5173"],
}
));
app.use(express.json());
app.use("/",authRoute);
app.use("/",homeRoute);
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));