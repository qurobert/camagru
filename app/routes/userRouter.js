import express from "express";
import {emailPasswordValidator} from "../validators/userValidator.js";
import UserController from "../controllers/userController.js";
import {verifyAuth} from "../middlewares/authMiddleware.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/register', emailPasswordValidator(), userController.register);
userRouter.post('/login', emailPasswordValidator(), userController.login);
userRouter.get('/user/:id', verifyAuth, userController.getUserById);
userRouter.get('/me', verifyAuth, userController.getUserConnected);
userRouter.get('/verify', verifyAuth, userController.verifyEmail);
userRouter.post('/reauth', verifyAuth, userController.reauth);
userRouter.post('/forgotpass', verifyAuth, userController.forgotPassword);
userRouter.post('/resetpass', verifyAuth, userController.resetPassword);

export default userRouter
