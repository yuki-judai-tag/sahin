import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";  // ESM'de __dirname için
import { connectionDB } from "./config/db.js";
import productRoutes from "../routes/product.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env dosyası backend klasörünün bir üstünde (MERN-CRASH-COURSE klasöründe) olduğu için tam yolunu belirtiyoruz
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectionDB();
  console.log("Server started at http://localhost:" + PORT);
});
