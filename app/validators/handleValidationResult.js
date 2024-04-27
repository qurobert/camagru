import {validationResult} from "express-validator";
import ErrorWithStatus from "../errors/ErrorWithStatus.js";

export const globalHandleValidationResult = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) throw new ErrorWithStatus(400, errors.array());
	next();
}