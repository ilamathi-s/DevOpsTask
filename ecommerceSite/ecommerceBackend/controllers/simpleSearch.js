import dotenv from "dotenv";
import db from "../config/db.js";
dotenv.config();
export const searchCategory = (req, res) => {
  const keyword = req.params.categoryName || "";
  const query = `
    SELECT * FROM Categories
    WHERE categoryName LIKE ? OR categoryDes LIKE ? 
    ORDER BY categoryId ASC
  `;
  db.query(query, [`%${keyword}%`, `%${keyword}%`], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ data: results });
  });
};
export const searchProduct = (req, res) => {
 const keyword = req.params.productName || ""; 
  const query = `
    SELECT * FROM Products
    WHERE productName LIKE ? OR productDes LIKE ?
    ORDER BY productId ASC
  `;
  db.query(query, [`%${keyword}%`, `%${keyword}%`], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ data: results });
  });
};
