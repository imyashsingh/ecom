import express from "express";
import formidable from "express-formidable";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
    ProductPhotoController,
    brainTreePaymentController,
    braintreeTokenController,
    createProductController,
    deleteProductController,
    getProduuctController,
    getSingleProduuctController,
    productCategoryController,
    productCountController,
    productFiltersController,
    productListController,
    realtedProductController,
    searchProductController,
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

router.get("/get-product/:pid", getSingleProduuctController);

router.get("/product-photo/:pid", ProductPhotoController);

router.post("/product-filters", productFiltersController);

router.get("/product-count", productCountController);

router.get("/product-list/:page", productListController);

router.get("/search/:keyword", searchProductController);

router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

router.delete("/delete-product/:pid", deleteProductController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;
