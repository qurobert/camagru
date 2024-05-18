import express from "express";
import {
	codeEmailValidator,
	loginValidator,
	emailValidator,
	refreshTokenValidator,
	resetPassValidator, registerValidator
} from "../validators/userValidator.js";
import UserController from "../controllers/userController.js";
import {verifyAuth} from "../middlewares/authMiddleware.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/register', registerValidator(), userController.register);
userRouter.post('/login', loginValidator(), userController.login);
userRouter.get('/user/:id', verifyAuth, userController.getUserById);
userRouter.get('/me', verifyAuth, userController.getUserConnected);
userRouter.post('/reauth', verifyAuth, refreshTokenValidator(), userController.reauth);
userRouter.post('/verify', verifyAuth, codeEmailValidator(), userController.verifyEmail);
userRouter.post('/sendverify', verifyAuth, emailValidator(), userController.sendVerificationEmail);
userRouter.post('/forgotpass', verifyAuth, emailValidator(), userController.forgotPassword);
userRouter.post('/resetpass', verifyAuth, resetPassValidator(), userController.resetPassword);

export default userRouter
