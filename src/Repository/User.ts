import { PrismaClient, User } from "@prisma/client";
import { IRepository } from ".";
import { prisma } from "../configs/db";

const USER_SELECT = {
	userId: true,
	name: true,
	image: true,
	email: true,
};

export interface IUserRepository
	extends IRepository<User, Omit<User, "password">> {}
class UserRepository implements IUserRepository {
	constructor(private user: PrismaClient["user"]) {}
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
