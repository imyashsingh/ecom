import slugify from "slugify";
import CategoryModel from "../models/CategoryModel.js";

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(401).send({ message: "Name is required" });
        }
        const existingCategory = await CategoryModel.findOne({ name });

        if (existingCategory) {
            res.status(200).send({
                success: false,
                message: "category already exist",
            });
        }

        const category = await CategoryModel({
            name,
            slug: slugify(name),
        }).save();

        res.status(201).send({
            success: true,
            message: "New category created",
            category,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Creating Category",
            error,
        });
    }
};

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await CategoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );

        if (!category) {
            res.status(200).send({
                success: false,
                message: "category not exist",
            });
        }

        res.status(201).send({
            success: true,
            message: "Category Updated Successfully",
            category,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while updating category",
            error,
        });
    }
};

export const categoryController = async (req, res) => {
    try {
        const category = await CategoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All Category List",
            category,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all category",
        });
    }
};

export const singleCategoryController = async (req, res) => {
    try {
        const category = await CategoryModel.findOne({ slug: req.params.slug });
        if (!category) {
            res.status(200).send({
                success: false,
                message: "category not exist",
            });
        }
        res.status(200).send({
            success: true,
            message: "Get Single Category Successfully",
            category,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting Single category",
        });
    }
};

export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await CategoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Category Deleted Successfully",
            category,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error while deleting category",
        });
    }
};
