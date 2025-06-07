import express from "express";
import dotenv from "dotenv";
import cors from "cors";  // CORS modülünü ekledik
import path from "path";
import { connectionDB } from "./config/db.js";
import productRoutes from "../routes/product.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// CORS Middleware'ini kullan
app.use(cors());  // Tüm domainlere izin verir (Güvenli değil ama lokal geliştirme için yeterli)
const __dirname = path.resolve(); // __dirname'i tanımladık
// JSON Middleware
app.use(express.json());

// API Route'ları
app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "./frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

// Server'ı başlat
app.listen(PORT, () => {
    connectionDB();
    console.log("Server started at http://localhost:" + PORT);
});
