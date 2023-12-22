import express from "express";

import { loginController, registerController } from "../controllers/authController.js"; 

//router object
const router=express.Router();

//Routing
//Register || methord Post
router.post('/register',registerController);

router.post('/login',loginController);

export default router;