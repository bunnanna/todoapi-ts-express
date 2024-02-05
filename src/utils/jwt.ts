import { JwtPayload, sign, verify } from "jsonwebtoken";
import { JWT_SIGH_OPTION } from "../configs/jwt";

class JWTHandler {
	constructor(private secret: string) {
		if (!secret) throw new Error("JWT secert in undefiend.");
	}

	signJWT = <T extends object>(playload: T) => {
		return sign(playload, this.secret, JWT_SIGH_OPTION);
	};

	verifyJWT = (token: string): JwtPayload => {
		return verify(token, this.secret) as JwtPayload;
	};
}
export const jwtHandler = new JWTHandler(process.env.JWT_SECRET!);
