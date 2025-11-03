import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import categoryRoute from "./routes/categoryRoutes.js";
import productRoute from "./routes/productRoutes.js";
import searchRoute from './routes/searchRoutes.js';
import { createProIndex,indexingProduct } from "./controllers/searchController.js";
dotenv.config();
const app = express();
app.use(cors(
    {
        origin: "http://localhost:5173",
    }
));
app.use(express.json());
app.use(categoryRoute);
app.use(productRoute);
app.use(searchRoute);
const setupElasticsearch = async () => {
  try {
    await createProIndex();   
    await indexingProduct(); 
    console.log("Elasticsearch setup complete");
  } catch (err) {
    console.error("Elasticsearch setup error:", err);
  }
};

setupElasticsearch();
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));