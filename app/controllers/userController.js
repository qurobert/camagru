class UserController {
	getUser(req, res) {
	}

	register(req, res) {

	}

	login(req, res) {

	}

	#checkValidationResult(req, res, next) {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({errors: errors.array()});
	}

}