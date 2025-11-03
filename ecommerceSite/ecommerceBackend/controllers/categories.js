import dotenv from "dotenv";
import db from "../config/db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const categoryUpload = async (req, res) => {
    let categories;
     try {
            const data = fs.readFileSync(path.join(__dirname, "../categories.json"), "utf-8");
            categories = JSON.parse(data);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to read categories.json" });
        }
    if (!Array.isArray(categories) || categories.length === 0) {
        return res.status(400).json({ error: "No categories provided" });
    }
    let errors = [];
    let uploadCount = 0;

    for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
        const query = `
            INSERT INTO Categories (categoryId, categoryName, categoryDes, uploadedDate)
            VALUES (?, ?, ?, ?)`;
        db.query(
            query,
            [category.categoryId, category.categoryName, category.categoryDes, category.uploadedDate],
            (err) => {
                if (err) {
                    console.error('Error  in inserting category');
                } else {
                    uploadCount++;
                }
                if (uploadCount + errors.length === categories.length) {
                    if (errors.length > 0) {
                        return res.status(500).json({
                            message: "Some categories failed to upload",
                            errors,
                            uploadCount,
                        });
                    } else {
                        return res.json({ message: "All categories uploaded", uploadCount });
                    }
                }
            }
        );
    }
};
export const category = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page-1) * limit;
    const query = "SELECT * FROM Categories ORDER BY categoryId ASC LIMIT ? OFFSET ?";
    db.query(query, [limit, offset], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        db.query("SELECT COUNT(*) AS total FROM Categories", (err2, count) => {
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