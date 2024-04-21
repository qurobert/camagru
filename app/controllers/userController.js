import UserModel from "../models/userModel.js";
import ErrorWithStatus from "../errors/ErrorWithStatus.js";

export default class UserController {

	register = async (req, res) => {
		const {email, password} = req.body;
		await this._checkUserExist();

		const user = await UserModel.create(email, password);
		console.log(user);
		// return jwt
		return res.status(200).json({
			status: 200,
			message: "User created successfully"
		});

		// async (req, res) => {
		// 	try {
		//
		// 		const {email, password} = req.body;
		// 		const userExist = await UserModel.findOne(email);
		// 		if (userExist) return res.status(400).send("User already exists");
		//
		// 		const user = await UserModel.register(email, password);
		//
		// 		const payload_access_token = {email: user.email, id: user.id, verification_status: user.verification_status};
		// 		const payload_refresh_token = {id: user.id};
		// 		const accessToken = jwt.sign(payload_access_token, process.env.JWT_ACCESS_TOKEN, {expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES});
		// 		const refreshToken = jwt.sign(payload_refresh_token, process.env.JWT_REFRESH_TOKEN, {expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES});
		//
		// 		res.status(201).json({accessToken, refreshToken});
		// 	} catch (e) {
		// 		res.status(500).send("Error in Registering")
		// 	}
		// })
	}

	_checkUserExist = async (email) => {
		// const userExist = await UserModel.findOne(email); // TODO: does not work
		// if (userExist) throw new Error("User already exists");
	}

	getUserConnected = (req, res) => {
	}

	getUserById = (req, res) => {

	}



	login = (req, res) => {

	}

	logout = (req, res) => {

	}

	verifyEmail = (req, res) => {

	}

	reauth = (req, res) => {
					//     body('refreshToken')
			//         .exists().withMessage('refreshToken is required')
			//         .isJWT().withMessage('refreshToken is not valid')
			//////     ],
			    // async  = (req, res) => => {
			//     const refreshToken = req.body.refreshToken;
			//     if (refreshToken == null) return res.sendStatus(401);
			//
			//     jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
			//         if (err) return res.sendStatus(403);
			//
			//         const accessToken = jwt.sign({email: user.email, id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
			//         res.json({accessToken});
			//     })
	}

	forgotPassword = (req, res) => {

	}

	resetPassword = (req, res) => {

	}
}