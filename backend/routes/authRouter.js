import express from "express";
import {verifyAuth} from "../middlewares/authMiddleware.js";
import {
    codeEmailValidator,
    emailValidator,
    refreshTokenValidator, registerValidator
} from "../validators/userValidator.js";
import AuthController from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post('/register',registerValidator(), AuthController.register);
authRouter.get('/verify-email', AuthController.verifyEmail);
authRouter.post('/login', AuthController.login);
authRouter.post('/send-email-verify', verifyAuth, emailValidator(), AuthController.sendVerificationEmail);
authRouter.post('/refresh', refreshTokenValidator(), AuthController.refreshAuth);

export default authRouter;