import { PrismaClient, User } from "@prisma/client";
import { IRepository } from ".";
import { prisma } from "../configs/db";

const USER_SELECT = {
	userId: true,
	name: true,
	image: true,
	email: true,
};

type IUserRepository = IRepository<User, Omit<User, "password">>;
class UserRepository implements IUserRepository {
	constructor(private user: PrismaClient["user"]) {}
	GetAll: IUserRepository["GetAll"] = async () => {
		return this.user.findMany({
			select: USER_SELECT,
		});
	};

	GetOneById: IUserRepository["GetOneById"] = (userId) => {
		return this.user.findUniqueOrThrow({
			where: { userId },
			select: USER_SELECT,
		});
	};
	Create: IUserRepository["Create"] = async (CreateBody) => {
		await this.user.create({
			data: CreateBody,
		});
	};
	Update: IUserRepository["Update"] = async (userId, UpdateBody) => {
		this.user.update({
			data: UpdateBody,
			where: { userId },
		});
	};
	Delete: IUserRepository["Delete"] = async (userId) => {
		this.user.delete({
			where: { userId },
		});
	};
}

export const userRepository = new UserRepository(prisma.user);
