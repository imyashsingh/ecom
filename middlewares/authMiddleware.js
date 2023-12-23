import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = async (req,res,next)=>{
    try {
        const decode=await JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user=decode;
        console.log(req.user);
        next();
    } catch (error) {
        res.status(402).send({
            success : false,
            message: 'Unauthorization Access',
            error,
        });
    }
}

export const isAdmin = async (req,res,next)=>{
    try {
        const {_id}=req.user;
        const user = await userModel.findById(_id);
        if(user.role!=1){
            res.status(401).send({
                success : false,
                message: 'Unauthorization Access Not Admin',
            });
        }
        else{
            next();
        }
        
    } catch (error) {
        res.status(401).send({
            success : false,
            message: 'Error in Admin middleware',
            error,
        });
    }
}