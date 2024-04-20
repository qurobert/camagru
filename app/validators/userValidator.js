import {body} from "express-validator";
export const formUserValidator = () => [
	body('email').isEmail().withMessage('Email is not valid'),
	body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters'),
]