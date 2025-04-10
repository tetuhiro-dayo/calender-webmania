import express from "express";
import pool from "../config/database";
const router = express.Router();

const initTables = async () => {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

        await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
      );
    `);

        await pool.query(`
      CREATE TABLE IF NOT EXISTS access_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        require_auth BOOLEAN DEFAULT FALSE,
        access_password_hash VARCHAR(255),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

        console.log("✅ テーブル作成完了！");
        process.exit(0);
    } catch (err) {
        console.error("❌ エラー:", err);
        process.exit(1);
    }
};

router.post("/init", async (req, res) => {
    try {
        await initTables();
        res.status(200).send("初期化完了！");
    } catch (err) {
        res.status(500).json({ message: "エラー発生", error: err });
    }
});

export default router;
