import express from "express";
import formidable from "express-formidable";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
    ProductPhotoController,
    createProductController,
    deleteProductController,
    getProduuctController,
    getSingleProduuctController,
    updateProductController,
} from "../controllers/productController.js";

const router = express.Router();

router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
);

router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
);

router.get("/get-product", getProduuctController);

router.get("/get-product/:slug", getSingleProduuctController);

router.get("/product-photo/:pid", ProductPhotoController);

router.delete("/delete-product/:pid", deleteProductController);

export default router;
