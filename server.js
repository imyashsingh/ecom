import express from "express";
import dotenv from "dotenv";

const app=express();
dotenv.config();

app.get("/",(req,res)=>{
    res.send({message:"it running"});
})

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=> console.log(`App is running on PORT=${PORT}`));