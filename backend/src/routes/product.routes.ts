import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { showProducts, showAddProductPage, handleAddProductPage} from "../controller/product.controller.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();




router.get("/products", showProducts);

router.get("/add-product", showAddProductPage);

router.post("/add-product", handleAddProductPage);


export default router