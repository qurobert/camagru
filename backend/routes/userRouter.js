import express from "express";
import {
	emailValidator,
	resetPassValidator
} from "../validators/userValidator.js";
import UserController from "../controllers/userController.js";
import {verifyAuth} from "../middlewares/authMiddleware.js";

const userRouter = express.Router();


userRouter.get('/me', verifyAuth, UserController.getUserConnected);
userRouter.get('/:id', verifyAuth, UserController.getUserById);
userRouter.post('/forgot-password', emailValidator(), UserController.forgotPassword);
userRouter.post('/reset-password', resetPassValidator(), UserController.resetPassword);
userRouter.post('/update', verifyAuth, UserController.updateUser);

export default userRouter