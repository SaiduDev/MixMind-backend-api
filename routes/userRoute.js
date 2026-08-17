import express from "express";
import { createAccount, userLogin, getUser } from "../controller/userController.js";
import { verifyAuth } from "../middleware/auth.js";
import { loginLimit } from "../middleware/ratelimiter.js";

const userRouter = express.Router();

userRouter.get("/user/profile", verifyAuth, getUser);
userRouter.post("/auth/signUp", createAccount);
userRouter.post("/auth/login",loginLimit ,userLogin);

export default userRouter;