import UserModel from "../models/userModel.js";
import {JWT, JWTAccessToken, JWTRefreshToken} from "../helpers/jwt.js";
import ErrorWithStatus from "../errors/ErrorWithStatus.js";
import {sendMail} from "../mail/sendMail.js";

export default class AuthController {
    static async register(req, res) {
        const {email, password, username} = req.body;
        await AuthController._checkUserExist(email);

        const user = await UserModel.create(email, username, password);
        if (!user) throw new Error("User not created");

        await AuthController._sendEmailLink(email);

        return res.json({
            status: 200,
            message: "User created successfully",
            access_token: JWTAccessToken.sign({email, id: user[0]}),
            refresh_token: JWTRefreshToken.sign({id: user[0]}),
        });
    }


    static async login(req, res) {
        const {email, password} = req.body;
        const user = await UserModel.login(email, password);

        return res.json({
            status: 200,
            message: "User logged in successfully",
            accessToken: JWTAccessToken.sign({email, id: user.id}),
            refreshToken: JWTRefreshToken.sign({id: user.id}),
        });
    }

    static async verifyEmail(req, res) {
        const {token} = req.query;
        JWTAccessToken.verify(token, async (err, emailTokenInfo) => {
            if (err) return res.sendStatus(403);

            const user = await UserModel.findById(emailTokenInfo.id);
            if (!user) return res.sendStatus(403);
            await UserModel.validate_email(user.email);
            return res.redirect('http://localhost/email-verified');
        })
    }

    static async sendVerificationEmail(req, res) {
        const {email} = req.body;
        await AuthController._sendEmailLink(email);
        res.json({
            status: 200,
            message: "Email sent",
        });

    }

    static async refreshAuth(req, res) {
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

    static async _checkUserExist(email) {
        const userExist = await UserModel.findOneByEmail(email);
        if (userExist) throw new ErrorWithStatus(400, "User already exists");
    }

    static async _sendEmailLink(email) {
        const user = await UserModel.findOneByEmail(email);
        if (!user)
            throw new ErrorWithStatus(404, "User not found");
        const token = JWTAccessToken.sign({id: user.id});
        const verificationLink = `http://localhost:3000/auth/verify-email?token=${token}`;
        const emailContent = `<p>Please verify your email by clicking on the following <a href="${verificationLink}">link</a></p>`;
        await sendMail(email, "Verify your email - Camagru", emailContent);
    }
}