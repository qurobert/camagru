import express from "express";
import User from "../model/User.js";
import {body, validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import {middleware_logged_in} from "../middleware/middleware_logged_in.js";

const userRouter = express.Router()


const registerChain = () => [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters'),
]
// Register
userRouter.post('/register', registerChain, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});

        const {email, password} = req.body;
        const user = await User.register(email, password);
        const payload_access_token = {email: user.email, id: user.id, verification_status: user.verification_status};
        const payload_refresh_token = {id: user.id};
        const accessToken = jwt.sign(payload_access_token, process.env.JWT_ACCESS_TOKEN, {expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES});
        const refreshToken = jwt.sign(payload_refresh_token, process.env.JWT_REFRESH_TOKEN, {expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES});

        res.status(201).json({accessToken, refreshToken});
    } catch (e) {
        res.status(500).send("Error in Registering")
    }
})

// Refresh Token
userRouter.post('/refresh-token', [
    middleware_logged_in(),
    body('refreshToken')
        .exists().withMessage('refreshToken is required')
        .isJWT().withMessage('refreshToken is not valid')
    ],
    async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        const accessToken = jwt.sign({email: user.email, id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({accessToken});
    })
})


// Login
userRouter.post('/login', async (req, res) => {
})

// Forgot Password
userRouter.post('/forgot-password', async (req, res) => {
})

// Reset Password
userRouter.post('/reset-password', async (req, res) => {
})

// Get User
userRouter.get('/me', middleware_logged_in, async (req, res) => {

})

// Update User information
userRouter.put('/me', async (req, res) => {
})


// Get user by id
userRouter.get('/:id', async (req, res) => {
})


export default userRouter
