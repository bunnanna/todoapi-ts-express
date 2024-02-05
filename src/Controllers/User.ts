import { RequestHandler } from "express";
import { IUserService, userService } from "../Services/User";
import { MessageDTO, NoPathParam } from "../dto";
import { LoginDTO, ReqUserDTO, ResUserDTO } from "../dto/user";

export interface IUserController {
	createUser: RequestHandler<NoPathParam, MessageDTO, ReqUserDTO>;
	getUserData: RequestHandler<{ id: string }, ResUserDTO>;
	getSelfData: RequestHandler<
		NoPathParam,
		ResUserDTO,
		unknown,
		unknown,
		{ id: string }
	>;
	login: RequestHandler<NoPathParam, MessageDTO, LoginDTO>;
}

class UserController implements IUserController {
	constructor(private service: IUserService) {}
	getSelfData: IUserController["getSelfData"] = async (req, res) => {
		const id = res.locals.id;
		const user = await this.service.getUserById(id);
		return res.json(user).end();
	};
	createUser: IUserController["createUser"] = async (req, res) => {
		const createUserBody = req.body;
		await this.service.createUser(createUserBody);
		return res.status(201).json({ message: "User Created" }).end();
	};
	getUserData: IUserController["getUserData"] = async (req, res) => {
		const id = req.params.id;
		const user = await this.service.getUserById(id);
		return res.json(user).end();
	};
	login: IUserController["login"] = async (req, res) => {
		const loginBody = req.body;
		const token = await this.service.login(loginBody);
		res
			.status(200)
			.cookie("accessToken", token, {
				expires: new Date(Date.now() + 900000),
				httpOnly: true,
			})
			.end();
	};
}

export const userController = new UserController(userService);
