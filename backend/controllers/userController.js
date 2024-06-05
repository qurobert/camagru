import UserModel from "../models/userModel.js";
import ErrorWithStatus from "../errors/ErrorWithStatus.js";
import {sendMail} from "../mail/sendMail.js";
import {generateVerificationCode} from "../helpers/generateVerificationCode.js";

export default class UserController {
	static async getUserConnected (req, res) {
		const user = await UserModel.findOneByEmail(req.user.email);
		if (!user) throw new ErrorWithStatus(404, "User not found");
		return res.json({
			status: 200,
			message: "User connected",
			user: {
				id: user.id,
				email: user.email,
				username: user.username,
				verify_email: user.verify_email,
			}
		});
	}

	static async getUserById (req, res) {
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
				verify_email: user.verify_email,
			}
		});
	}

	static async forgotPassword(req, res) {
		const {email} = req.body;
		const code = generateVerificationCode(6);
		await sendMail(email, "Reset your password - Camagru", "<p>Code verification: " + code + "</p>");
		await UserModel.updatePasswordCode(email, code);
		res.json({
			status: 200,
			message: "Email sent",
		});
	}

	static async resetPassword(req, res) {
		const {code, password} = req.body;
		const user = await UserModel.findOneByEmail(req.user.email);
		if (user.code_password_reset !== code) throw new ErrorWithStatus(400, "Code verification is not valid");
		await UserModel.updatePassword(req.user.email, password);
		res.json({
			status: 200,
			message: "Password reset",
		});
	}

	static async updateUser(req, res) {
		const { email, username, password, confirm_password, notification } = req.body;
		if (email) {
			await UserModel.updateEmail(req.user.id, email);
		}
		if (username) {
			await UserModel.updateUsername(req.user.id, username);
		}
		if (password) {
			if (password !== confirm_password) throw new ErrorWithStatus(400, "Passwords do not match");
			await UserModel.updatePassword(req.user.email, password);
		}
		if (notification !== undefined) {
			await UserModel.updateNotification(req.user.id, notification);
		}
		res.json({
			status: 200,
			message: "User updated",
		});
	}
}