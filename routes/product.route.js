import express from "express";

import { createProduct, deleteProduct, getProducts, updatedProduct } from "../backend/controllers/product.controller.js";

const router = express.Router();

    router.get("/",getProducts);
    router.post("/",createProduct);
    router.put("/:id",updatedProduct);
    router.delete("/:id",deleteProduct);

export default router;