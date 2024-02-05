import { SignOptions } from "jsonwebtoken";

export const JWT_SIGH_OPTION: SignOptions = {
	algorithm: "HS512",
	expiresIn: "2d",
	issuer: "learnhub",
	subject: "user-credential",
};
