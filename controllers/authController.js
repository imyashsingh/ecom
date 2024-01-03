import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

import { comparePassword, hashPassword } from "../helpers/authHelper.js";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;

        //validation
        if (!name) {
            return res.send({ message: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }
        if (!phone) {
            return res.send({ message: "Phone is Required" });
        }
        if (!answer) {
            return res.send({ message: "Answer is Required" });
        }
        if (!address) {
            return res.send({ message: "Addresss is Required" });
        }
        //user already exist
        const exisitingUser = await userModel.findOne({ email });
        if (exisitingUser) {
            return res.status(409).send({
                success: false,
                message: "USER ALREADY EXISIT PLEASE LOGIN",
            });
        }

        //password hashing
        const hashedPassword = await hashPassword(password);

        // creating new user
        const user = await userModel({
            name,
            email,
            phone,
            address,
            answer,
            password: hashedPassword,
        }).save();

        res.status(201).send({
            success: true,
            message: "REGISTRATION SUCCESSFULLY",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "ERROR IN USER REGISTRATION",
            error,
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //if value not present
        if (!email || !password) {
            res.status(404).send({
                success: false,
                message: "INVALID EMAIL AND PASSWORD",
            });
        }

        const user = await userModel.findOne({ email });
        // check email
        if (!user) {
            res.status(404).send({
                success: false,
                message: "EMAIL NOT REGISTER",
            });
        }
        //check password
        const match = await comparePassword(password, user.password);
        if (!match) {
            res.status(404).send({
                success: false,
                message: "PASSWORD NOT REGISTER",
            });
        }

        // jwt token
        const token = await JWT.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).send({
            success: true,
            message: "LOGIN SUCCESSFULLY",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "ERROR IN USER LOGIN",
            error,
        });
    }
};

export const testController = async (req, res) => {
    res.send({
        success: true,
        message: "Path Protected",
    });
};

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            return res.status(400).send({ message: "Name is Required" });
        }
        if (!newPassword) {
            return res.status(400).send({ message: "Password is Required" });
        }
        if (!answer) {
            return res.status(400).send({ message: "answer is Required" });
        }

        const user = await userModel.findOne({ email, answer });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "wrong email or answer",
            });
        }
        const hashed = await hashPassword(newPassword);
        const doc = await userModel.findByIdAndUpdate(
            user._id,
            { password: hashed },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
            user: doc,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "somthing went wrong",
            error,
        });
    }
};
