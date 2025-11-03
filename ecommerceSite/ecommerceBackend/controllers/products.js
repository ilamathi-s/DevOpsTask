import dotenv from "dotenv";
import db from "../config/db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const productUpload = async (req, res) => {
    let products;
     try {
            const data = fs.readFileSync(path.join(__dirname, "../products.json"), "utf-8");
            products = JSON.parse(data);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to read products.json" });
        }
    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: "No products provided" });
    }
    let errors = [];
    let uploadCount = 0;

    for (let i = 0; i < products.length; i++) {
    const product = products[i];
        const query = `
            INSERT INTO Products (productId, productName, productDes, MRP, discount,quantity,categoryId )
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
        db.query(
            query,
            [product.productId, product.productName, product.productDes, product.MRP,product.discount,product.quantity,product.categoryId],
            (err) => {
                if (err) {
                    console.error('Error  in inserting product');
                } else {
                    uploadCount++;
                }
                if (uploadCount + errors.length === products.length) {
                    if (errors.length > 0) {
                        return res.status(500).json({
                            message: "Some products failed to upload",
                            errors,
                            uploadCount,
                        });
                    } else {
                        return res.json({ message: "All products uploaded", uploadCount });
                    }
                }
            }
        );
    }
};
export const productDisplay = (req, res) => {
  const query = "SELECT * FROM Products ORDER BY productId ASC";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ data: results });
  });
};
export const productByCategory = (req, res) => {
  const categoryId = req.params.categoryId;
  const query = "SELECT * FROM Products WHERE categoryId = ? ORDER BY productId ASC";
  db.query(query, [categoryId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ data: results });
  });
};
export const productPaginate = (req, res) => {
    const categoryId = req.params.categoryId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const query = "SELECT * FROM Products WHERE categoryId = ? ORDER BY productId ASC LIMIT ? OFFSET ?";
    db.query(query, [categoryId, limit, offset], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        db.query(
            "SELECT COUNT(*) AS total FROM Products WHERE categoryId = ?",
            [categoryId],
            (err2, count) => {
                if (err2) return res.status(500).json({ error: err2.message });

                const total = count[0].total;
                const totalPages = Math.ceil(total / limit);

                res.json({
                    page,
                    limit,
                    total,
                    totalPages,
                    data: results,
                });
            }
        );
    });
};
export const allProductsPaginate = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const query = "SELECT * FROM Products ORDER BY productId ASC LIMIT ? OFFSET ?";
    db.query(query, [limit, offset], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        db.query("SELECT COUNT(*) AS total FROM Products", (err2, count) => {
            if (err2) return res.status(500).json({ error: err2.message });

            const total = count[0].total;
            const totalPages = Math.ceil(total / limit);

            res.json({
                page,
                limit,
                total,
                totalPages,
                data: results,
            });
        });
    });
};
