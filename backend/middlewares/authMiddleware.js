import {JWTAccessToken} from "../helpers/jwt.js";

export function verifyAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

	JWTAccessToken.verify(token, (err, user) => {
		if (err) {
			const status = err.name === 'TokenExpiredError' ? 401 : 403
			return res.status(status).json({
				status,
				message: status === 401 ? 'Token expired' : 'Invalid token'
			});
		}
		req.user = user;
		next();
	})
}