import express from "express";
import {
	codeEmailValidator,
	emailPasswordValidator,
	emailValidator,
	refreshTokenValidator,
	resetPassValidator
} from "../validators/userValidator.js";
import UserController from "../controllers/userController.js";
import AuthController from "../controllers/authController.js";
import {verifyAuth} from "../middlewares/authMiddleware.js";

const userRouter = express.Router();


userRouter.get('/user/:id', verifyAuth, UserController.getUserById);
userRouter.get('/me', verifyAuth, UserController.getUserConnected);
userRouter.post('/forgot-password', verifyAuth, emailValidator, UserController.forgotPassword);
userRouter.post('/reset-password', verifyAuth, resetPassValidator, UserController.resetPassword);

export default userRouter
