import UserModel from "../models/userModel.js";
import ErrorWithStatus from "../errors/ErrorWithStatus.js";
import {JWTAccessToken, JWTRefreshToken} from "../helpers/jwt.js";
import {sendMail} from "../mail/sendMail.js";
import {generateVerificationCode} from "../helpers/generateVerificationCode.js";

export default class UserController {

	register = async (req, res) => {
		const {email, username, password} = req.body;
		await this._checkUserExist(email, username);

		const user = await UserModel.create(email, username, password);
		if (!user) throw new Error("User not created");

		await this._sendEmailCodeAndStoreInDb(email);

		return res.json({
			status: 200,
			message: "User created successfully",
			access_token: JWTAccessToken.sign({email, id: user[0], username}),
			refresh_token: JWTRefreshToken.sign({id: user[0]}),
			verify_email: 0
		});
	}

	login = async (req, res) => {
		const {email, password} = req.body;
		const user = await UserModel.login(email, password);
		return res.json({
			status: 200,
			message: "User logged in successfully",
			access_token: JWTAccessToken.sign({email, id: user.id, username: user.username}),
			refresh_token: JWTRefreshToken.sign({id: user.id}),
			verify_email: user.verify_email
		});
	}

	getUserConnected = async (req, res) => {
		const user = await UserModel.findById(req.user.id);
		return res.json({
			status: 200,
			message: "User connected",
			user: {
				id: user.id,
				email: user.email,
				username: user.username,
				verify_email: user.verify_email
			}
		});
	}

	getUserById = async (req, res) => {
		const {id} = req.params;
		const user = await UserModel.findById(id);
		if (!user) throw new ErrorWithStatus(404, "User not found");

		return res.status(200).json({
			status: 200,
			message: "User found",
			user: {
				id: user.id,
				email: user.email,
				username: user.username,
			}
		});
	}

	verifyEmail = async (req, res) => {
		const {code} = req.body;
		const user = await UserModel.findById(req.user.id);
		if (user.code_verify_email !== code) throw new ErrorWithStatus(400, "Code verification is not valid");

		await UserModel.validate_email(user.email);
		return res.json({
			status: 200,
			message: "Email verified",
		});
	}

	sendVerificationEmail = async (req, res) => {
		const {email} = req.body;
		await this._sendEmailCodeAndStoreInDb(email);
		const user = await UserModel.findOneByEmail(email);
		if (!user) throw new ErrorWithStatus(404, "User not found");
		res.json({
			status: 200,
			message: "Email sent",
		});

	}

	reauth = (req, res) => {
		const refreshToken = req.body.refreshToken;

		JWTRefreshToken.verify(refreshToken, async (err, refreshTokenInfo) => {
			if (err) return res.sendStatus(403);

			const user = await UserModel.findById(refreshTokenInfo.id);
			if (!user) return res.sendStatus(403);
			const accessToken = JWTAccessToken.sign({email: user.email, id: user.id});
			const refreshToken = JWTRefreshToken.sign({id: user.id});
			res.json({
				status: 200,
				message: "User reauthenticated",
				accessToken,
				refreshToken
			});
		})
	}

	forgotPassword = async (req, res) => {
		const {email} = req.body;
		const code = generateVerificationCode(6);
		await sendMail(email, "Reset your password - Camagru", "<p>Code verification: " + code + "</p>");
		await UserModel.updatePasswordCode(email, code);
		res.json({
			status: 200,
			message: "Email sent",
		});
	}

	resetPassword = async (req, res) => {
		const {code, password} = req.body;
		const user = await UserModel.findOneByEmail(req.user.email);
		if (user.code_password_reset !== code) throw new ErrorWithStatus(400, "Code verification is not valid");
		await UserModel.updatePassword(req.user.email, password);
		res.json({
			status: 200,
			message: "Password reset",
		});
	}


	// Private methods
	_checkUserExist = async (email, username) => {
		if (await UserModel.findOneByEmail(email) || await UserModel.findOneByUsername(username))
			throw new ErrorWithStatus(400, "User already exists");
	}

	_sendEmailCodeAndStoreInDb = async (email) => {
		const code = generateVerificationCode(6);
		await sendMail(email, "Verify your email - Camagru", "<p>Code verification: " + code + "</p>");
		await UserModel.updateEmailCode(email, code);
	}
}