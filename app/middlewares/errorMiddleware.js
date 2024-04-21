export const errorMiddleware = (err, req, res, next) => {
	const message = err.message || 'Something went wrong';
	const status = err.status || 500;

	res.status(status).json({
		status,
		message
	});
};

export const errorLogger = (err, req, res, next) => {
	console.error('>>>>>>>>>>>>>>>>>>');
	console.error(err);
	console.error('>>>>>>>>>>>>>>>>>>');
	next(err);
};
