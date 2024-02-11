import { Prisma, PrismaClient, User } from "@prisma/client";
import { IRepository } from ".";
import { prisma } from "../configs/db";
import { ReqUserDTO, ResUserDTO } from "../dto/user";

export const USER_SELECT: Prisma.UserSelect = {
	userId: true,
	name: true,
	image: true,
	email: true,
};

export interface IUserRepository
	extends IRepository<ReqUserDTO, string, ResUserDTO> {
	getOneByEmail: (email: string) => Promise<User>;
}
class UserRepository implements IUserRepository {
	constructor(private user: PrismaClient["user"]) {}
	getOneByEmail: IUserRepository["getOneByEmail"] = (email) => {
		return this.user.findFirstOrThrow({
			where: { email },
		});
	};
	getAll: IUserRepository["getAll"] = async () => {
		return this.user.findMany({
			select: USER_SELECT,
		});
	};

	getOneById: IUserRepository["getOneById"] = (userId) => {
		return this.user.findUniqueOrThrow({
			where: { userId },
			select: USER_SELECT,
		});
	};
	create: IUserRepository["create"] = async (CreateBody) => {
		await this.user.create({
			data: CreateBody,
		});
	};
	update: IUserRepository["update"] = async (userId, UpdateBody) => {
		this.user.update({
			data: UpdateBody,
			where: { userId },
		});
	};
	delete: IUserRepository["delete"] = async (userId) => {
		this.user.delete({
			where: { userId },
		});
	};
}

export const userRepository = new UserRepository(prisma.user);
