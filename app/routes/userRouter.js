import express from "express";
import {emailPasswordValidator} from "../validators/userValidator.js";
import UserController from "../controllers/userController.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/register', emailPasswordValidator(), userController.register);
userRouter.post('/login', emailPasswordValidator(), userController.login);
userRouter.get('/logout', userController.logout);
userRouter.get('/verify', userController.verifyEmail);
userRouter.post('/reauth', userController.reauth);
userRouter.post('/forgotpass', userController.forgotPassword);
userRouter.post('/resetpass', userController.resetPassword);
userRouter.get('/me', userController.getUserConnected);
userRouter.get('/:id', userController.getUserById);

export default userRouter
