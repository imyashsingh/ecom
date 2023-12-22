import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

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
        const userDoc = await userModel({
            name,
            email,
            phone,
            address,
            password : hashedPassword,
            }).save();

        res.status(201).send({
            success : true,
            message : 'REGISTRATION SUCCESSFULLY',
            userDoc,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : 'fail',
            message : 'ERROR IN USER REGISTRATION',
        });
    }
}