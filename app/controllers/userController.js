import UserModel from "../models/userModel.js";
import ErrorWithStatus from "../errors/ErrorWithStatus.js";
import {JWTAccessToken, JWTRefreshToken} from "../helpers/jwt.js";

export default class UserController {

	register = async (req, res) => {
		const {email, password} = req.body;
		await this._checkUserExist(email);

		const user = await UserModel.create(email, password)
		if (!user) throw new Error("User not created");

		return res.status(200).json({
			status: 200,
			message: "User created successfully",
			access_token: JWTAccessToken.sign({email, id: user[0]}),
			refresh_token: JWTRefreshToken.sign({id: user[0]}),
		});
	}

	_checkUserExist = async (email) => {
		const userExist = await UserModel.findOne(email);
		if (userExist) throw new ErrorWithStatus(400, "User already exists");
	}
	login = async (req, res) => {
		const {email, password} = req.body;
		const user = await UserModel.login(email, password);

		return res.status(200).json({
			status: 200,
			message: "User logged in successfully",
			access_token: JWTAccessToken.sign({email, id: user.id}),
			refresh_token: JWTRefreshToken.sign({id: user.id}),
		});
	}

	getUserConnected = (req, res) => {
		const user = req.user;
		return res.status(200).json({
			status: 200,
			message: "User connected",
			user: {
				id: user.id,
				email: user.email,
			}
		});
	}

	getUserById = (req, res) => {
		const {id} = req.params;
		const user = UserModel.findById(id);
		if (!user) throw new ErrorWithStatus(404, "User not found");

		return res.status(200).json({
			status: 200,
			message: "User found",
			user: {
				id: user.id,
				email: user.email,
			}
		});
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