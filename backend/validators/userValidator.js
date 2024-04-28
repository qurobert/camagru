import {body} from "express-validator";
import {globalHandleValidationResult} from "./handleValidationResult.js";

export const emailPasswordValidator = () => [
	body('email').isEmail().withMessage('Email is not valid'),
	body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters'),
	globalHandleValidationResult
]
export const refreshTokenValidator = () => [
	body('refreshToken').isString().withMessage('Refresh token must be a string'),
	globalHandleValidationResult
]
export const codeEmailValidator = () => [
	body('code').isString().withMessage('Code must be a non-empty string'),
	globalHandleValidationResult
]

export const emailValidator = () => [
	body('email').isEmail().withMessage('Email is not valid'),
	globalHandleValidationResult
]

export const resetPassValidator = () => [
	body('code').isString().withMessage('Code must be a non-empty string'),
	body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters'),
	globalHandleValidationResult
]
