import {body} from "express-validator";
import {globalHandleValidationResult} from "./handleValidationResult.js";

export const registerValidator = () => [
	body('email').isEmail().withMessage('Email is not valid'),
	body('password')
		.isLength({min: 6}).withMessage('Password must be at least 6 characters')
		.matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
		.matches(/\W/).withMessage('Password must contain at least one special character'),
	body('username').isLength({min: 6, }).withMessage('Username must be at least 6 characters'),
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
