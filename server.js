import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import morgan from "morgan";

// config env
dotenv.config();

//database connection
connectDb();

const app=express();

//middleware
app.use(express.json());
app.use(morgan('dev'))


app.get("/",(req,res)=>{
    res.send("<h1>hello world!</h1>");
})

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=> console.log(`App is running on PORT=${PORT}`));