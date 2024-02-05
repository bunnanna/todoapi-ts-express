import { RequestHandler } from "express";
import { jwtHandler } from "../utils/jwt";

class JWTMiddleware {
	constructor() {}

	decodeJWT: RequestHandler = (req, res, next) => {
		const token = req.cookies?.accessToken as string;
		if (!token) return next();
		try {
			const credential = jwtHandler.verifyJWT(token);
			res.locals = credential;
			return next();
		} catch (err) {
			if (err instanceof Error) return next(err);
		}
	};
}

export const jwtMiddleware = new JWTMiddleware();
