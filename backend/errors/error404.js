class Error404 extends Error {
	constructor() {
		super("Error 404: Not Found");
		this.name = this.constructor.name;
		this.status = 404;
	}
}

export const error404 =  (req, res, next) => {
	next(new Error404());
};