import fs from "fs";
import slugify from "slugify";

import productModel from "../models/productModel.js";

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } =
            req.fields;
        const { photo } = req.files;
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ message: "Name is required" });
            case !description:
                return res
                    .status(500)
                    .send({ message: "Description is required" });
            case !price:
                return res.status(500).send({ message: "Price is required" });
            case !category:
                return res
                    .status(500)
                    .send({ message: "Category is required" });
            case !quantity:
                return res
                    .status(500)
                    .send({ message: "Quantity is required" });
            case !photo || photo.size > 100000:
                return res.status(500).send({
                    error: "Photo is required and should be less than 1MB",
                });
        }

        const products = new productModel({
            ...req.fields,
            slug: slugify(name),
        });

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "New Product created",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Creating Product",
            error,
        });
    }
};

export const getProduuctController = async (req, res) => {
    try {
        const products = await productModel
            .find({})
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(201).send({
            success: true,
            message: "All Product",
            totalCount: products.length,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Getting Product",
            error,
        });
    }
};

export const getSingleProduuctController = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");
        res.status(201).send({
            success: true,
            message: "Single Product Fetched",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Getting Single Product",
            error,
        });
    }
};

export const ProductPhotoController = async (req, res) => {
    try {
        const product = await productModel
            .findById(req.params.pid)
            .select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Getting Product Photo",
            error,
        });
    }
};

export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(201).send({
            success: true,
            message: "Product Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Deleting Product",
            error,
        });
    }
};

export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } =
            req.fields;
        const { photo } = req.files;
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" });
            case !description:
                return res
                    .status(500)
                    .send({ error: "Description is required" });
            case !price:
                return res.status(500).send({ error: "Price is required" });
            case !category:
                return res.status(500).send({ error: "Category is required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is required" });
            case photo && photo.size > 100000:
                return res.status(500).send({
                    error: "Photo is required and should be less than 1MB",
                });
        }

        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Updated",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Updating Product",
            error,
        });
    }
};

export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            message: "Product Filtered Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Getting Filter Product",
            error,
        });
    }
};

export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();

        res.status(200).send({
            success: true,
            message: "Product Counted Successfully",
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Getting Product Count",
            error,
        });
    }
};

export const productListController = async (req, res) => {
    try {
        const perPage = 8;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            message: "Product Per Page Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Getting Per Page Product",
            error,
        });
    }
};
