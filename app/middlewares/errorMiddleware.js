const ErrorHandler = (err, req, res, next) => {
	console.log("Middleware Error Hadnling");
	const status = err.statusCode || 500;
	const message = err.message || 'Something went wrong';
	res.status(status).json({
		success: false,
		status: status,
		message: message,
		stack: process.env.NODE_ENV === 'development' ? err.stack : {}
	})
}

export default ErrorHandler