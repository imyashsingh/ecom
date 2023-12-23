import JWT from 'jsonwebtoken';
import userModel from "../models/userModel.js";

import { comparePassword, hashPassword } from "../helpers/authHelper.js";

export const registerController= async (req,res)=>{

    try {
        
        const {name,email,password,phone,address} = req.body;
    
        //validation
        if(!name){
            return res.send({error:'Name is Required'});
        }
        if(!email){
            return res.send({error:'Email is Required'});
        }
        if(!password){
            return res.send({error:'Password is Required'});
        }
        if(!phone){
            return res.send({error:'Phone is Required'});
        }
        if(!address){
            return res.send({error:'Addresss is Required'});
        }
        //user already exist
        const exisitingUser= await userModel.findOne({email});
        if(exisitingUser){
            return res.status(409).send({
                success : false,
                message : 'USER ALREADY EXISIT PLEASE LOGIN',
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
            password : hashedPassword,
            }).save();

        res.status(201).send({
            success : true,
            message : 'REGISTRATION SUCCESSFULLY',
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'ERROR IN USER REGISTRATION',
            error
        });
    }
}

export const loginController = async (req,res)=>{
    try {
        const {email,password} = req.body;

        //if value not present
        if(!email || !password){
            res.status(404).send({
                success : false,
                message : 'INVALID EMAIL AND PASSWORD',
            });
        }

        const user= await userModel.findOne({email});
        // check email
        if(!user){
            res.status(404).send({
                success : false,
                message : 'EMAIL NOT REGISTER',
            });
        }
        //check password
        const match = await comparePassword(password,user.password);
        if(!match){
            res.status(404).send({
                success : false,
                message : 'PASSWORD NOT REGISTER',
            });
        }
        
        // jwt token
        const token=await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn : '7d',});

        res.status(200).send({
            success : true,
            message: "LOGIN SUCCESSFULLY",
            user : {
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
            },
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'ERROR IN USER LOGIN',
            error
        });
    }
}

export const testController = async(req,res)=>{
    res.send({
        success:true,
        message:"Path Protected",
    })
}