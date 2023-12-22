import express from "express";

import { registerController } from "../controllers/authController.js"; 

//router object
const router=express.Router();

//Routing
//Register || methord Post
router.post('/register',registerController);

export default router;