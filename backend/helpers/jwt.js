import jwt from "jsonwebtoken";

export class JWT {
  static sign(payload, secret, expiresIn) {
    return jwt.sign(payload, secret, {expiresIn});
  }
  static verify(token, secret, cb) {
    return jwt.verify(token, secret, cb);
  }
}

export class JWTAccessToken {
  static sign(payload) {
    return JWT.sign(payload, process.env.JWT_ACCESS_TOKEN, process.env.JWT_ACCESS_TOKEN_EXPIRES);
  }

  static verify(token, cb) {
    return JWT.verify(token, process.env.JWT_ACCESS_TOKEN, cb);
  }
}

export class JWTRefreshToken {
  static sign(payload) {
    return JWT.sign(payload, process.env.JWT_REFRESH_TOKEN, process.env.JWT_REFRESH_TOKEN_EXPIRES);
  }

  static verify(token, cb) {
    return JWT.verify(token, process.env.JWT_REFRESH_TOKEN, cb);
  }
}