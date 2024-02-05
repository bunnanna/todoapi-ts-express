import { IUserRepository, userRepository } from "../Repository/User";
import { LoginDTO, ReqUserDTO, ResUserDTO } from "../dto/user";
import { hashPassword, verifyPassword } from "../utils/bcrypt";
import { jwtHandler } from "../utils/jwt";

interface IUserService {
	createUser: (userBody: ReqUserDTO) => Promise<void>;
	getUserById: (userId: string) => Promise<ResUserDTO>;
	login: (loginBody: LoginDTO) => Promise<string>;
}

class UserService implements IUserService {
	constructor(private repo: IUserRepository) {}
	createUser: IUserService["createUser"] = async (userBody) => {
		await this.repo.create({
			...userBody,
			password: hashPassword(userBody.password),
		});
	};
	getUserById: IUserService["getUserById"] = async (userId) => {
		return this.repo.getOneById(userId);
	};
	login: IUserService["login"] = async (loginBody) => {
		const user = await this.repo.getOneByEmail(loginBody.email);
		if (!verifyPassword(loginBody.password, user.password))
			throw new Error("Bad Request");
		return jwtHandler.signJWT({ id: user.userId });
	};
}

export const userService = new UserService(userRepository);
