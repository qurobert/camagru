import {JWTAccessToken} from "../helpers/jwt.js";

export function verifyAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

	JWTAccessToken.verify(token, (err, user) => {
		if (err) return res.sendStatus(403);

		req.user = user;
		next();
	})
}