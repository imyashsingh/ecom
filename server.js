import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import morgan from "morgan";
import cors from "cors";

import authRouters from "./routes/authRoute.js";
import categoryRouters from "./routes/categoryRoute.js";
import productRouters from "./routes/productRoute.js";

// config env
dotenv.config();

//database connection
connectDb();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouters);
app.use("/api/v1/category", categoryRouters);
app.use("/api/v1/product", productRouters);

app.get("/", (req, res) => {
    res.send("<h1>hello world!</h1>");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`App is running on PORT=${PORT}`));
