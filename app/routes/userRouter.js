import express from "express";
import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import {formUserValidator} from "../validators/userValidator.js";

const userRouter = express.Router()

// Register
userRouter.post('/register', formUserValidator, async (req, res) => {
    try {

        const {email, password} = req.body;
        const userExist = await UserModel.findOne(email);
        if (userExist) return res.status(400).send("User already exists");

        const user = await UserModel.register(email, password);

        const payload_access_token = {email: user.email, id: user.id, verification_status: user.verification_status};
        const payload_refresh_token = {id: user.id};
        const accessToken = jwt.sign(payload_access_token, process.env.JWT_ACCESS_TOKEN, {expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES});
        const refreshToken = jwt.sign(payload_refresh_token, process.env.JWT_REFRESH_TOKEN, {expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES});

        res.status(201).json({accessToken, refreshToken});
    } catch (e) {
        res.status(500).send("Error in Registering")
    }
})

// Login
userRouter.post('/login', formUserValidator, async (req, res) => {

})


// Logout
userRouter.get('/logout', async (req, res) => {
})


// Refresh Token
// userRouter.post('/reauth', [
//     body('refreshToken')
//         .exists().withMessage('refreshToken is required')
//         .isJWT().withMessage('refreshToken is not valid')
//     ],
//     async (req, res) => {
//     const refreshToken = req.body.refreshToken;
//     if (refreshToken == null) return res.sendStatus(401);
//
//     jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);
//
//         const accessToken = jwt.sign({email: user.email, id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
//         res.json({accessToken});
//     })
// })


// Forgot Password
userRouter.post('/forgotpass', async (req, res) => {
})

// Reset Password
userRouter.post('/resetpass', async (req, res) => {
})

// Get User
userRouter.get('/me', async (req, res) => {

})

// Get user by id
userRouter.get('/:id', async (req, res) => {
})

export default userRouter
