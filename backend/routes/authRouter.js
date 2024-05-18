import express from "express";
import {verifyAuth} from "../middlewares/authMiddleware.js";
import {
    codeEmailValidator,
    emailPasswordValidator,
    emailValidator,
    refreshTokenValidator
} from "../validators/userValidator.js";
import AuthController from "../controllers/authController.js";
import userRouter from "./userRouter.js";

const authRouter = express.Router();

authRouter.post('/verify-email', verifyAuth, codeEmailValidator, AuthController.verifyEmail);
authRouter.post('/send-email-verify', verifyAuth, emailValidator, AuthController.sendVerificationEmail);
userRouter.post('/refresh', verifyAuth, refreshTokenValidator, AuthController.refreshAuth);
authRouter.post('/register', emailPasswordValidator, AuthController.register);
authRouter.post('/login', emailPasswordValidator, AuthController.login);

export default authRouter;