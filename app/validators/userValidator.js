import {body} from "express-validator";
import {globalHandleValidationResult} from "./handleValidationResult.js";
export const emailPasswordValidator = () => [
	body('email').isEmail().withMessage('Email is not valid'),
	body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters'),
	globalHandleValidationResult
]
