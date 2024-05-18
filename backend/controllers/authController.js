import UserModel from "../models/userModel.js";
import {JWTAccessToken, JWTRefreshToken} from "../helpers/jwt.js";
import ErrorWithStatus from "../errors/ErrorWithStatus.js";
import {generateVerificationCode} from "../helpers/generateVerificationCode.js";
import {sendMail} from "../mail/sendMail.js";

export default class AuthController {
    static async register(req, res) {
        const {email, password} = req.body;
        await this._checkUserExist(email);

        const user = await UserModel.create(email, password);
        if (!user) throw new Error("User not created");

        await this._sendEmailCodeAndStoreInDb(email);

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
        const {code} = req.body;
        const user = await UserModel.findById(req.user.id);
        if (user.code_verify_email !== code) throw new ErrorWithStatus(400, "Code verification is not valid");

        await UserModel.validate_email(user.email);
        return res.json({
            status: 200,
            message: "Email verified",
        });
    }

    static async sendVerificationEmail(req, res) {
        const {email} = req.body;
        await this._sendEmailCodeAndStoreInDb(email);
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
        const userExist = await UserModel.findOne(email);
        if (userExist) throw new ErrorWithStatus(400, "User already exists");
    }

    static async _sendEmailCodeAndStoreInDb(email) {
        const code = generateVerificationCode(6);
        await sendMail(email, "Verify your email - Camagru", "<p>Code verification: " + code + "</p>");
        await UserModel.updateEmailCode(email, code);
    }
}