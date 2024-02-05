import { compareSync, genSaltSync, hashSync } from "bcryptjs";

export const hashPassword = (plainText: string) => {
	const salt = genSaltSync(12);
	return hashSync(plainText, salt);
};

export const verifyPassword = (plainText: string, hashVal: string) => {
	return compareSync(plainText, hashVal);
};
