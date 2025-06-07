// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { connectionDB } from "./config/db.js";
import productRoutes from "../routes/product.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// CORS
app.use(cors());

// JSON body parser
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// __dirname çözümü (ESM için)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Production için statik frontend dosyaları
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "index.html"));
  });
}

app.listen(PORT, () => {
  connectionDB();
  console.log(`Server started on http://localhost:${PORT}`);
});
