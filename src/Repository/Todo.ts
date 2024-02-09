import { Prisma, PrismaClient } from "@prisma/client";
import { IRepository } from ".";
import { prisma } from "../configs/db";
import { ReqTodoDTO, ResTodoDTO } from "../dto/todo";
import { USER_SELECT } from "./User";

const TODO_SELECT: Prisma.TodoSelect = {
	id: true,
	title: true,
	CreatedAt: true,
	isCompleted: true,
	user: { select: USER_SELECT },
};
interface ReqTodo extends ReqTodoDTO {
	userId: string;
}

export interface ITodoRepository
	extends IRepository<ReqTodo, ResTodoDTO, number> {}
class TodoRepository implements ITodoRepository {
	constructor(private todo: PrismaClient["todo"]) {}

	getAll: ITodoRepository["getAll"] = async () => {
		return this.todo.findMany({
			select: TODO_SELECT,
		});
	};

	getOneById: ITodoRepository["getOneById"] = (id) => {
		return this.todo.findUniqueOrThrow({
			where: { id },
			select: TODO_SELECT,
		});
	};
	create: ITodoRepository["create"] = async (CreateBody) => {
		const { userId, ...body } = CreateBody;
		await this.todo.create({
			data: {
				...body,
				user: { connect: { userId } },
			},
		});
	};
	update: ITodoRepository["update"] = async (id, UpdateBody) => {
		this.todo.update({
			data: UpdateBody,
			where: { id },
		});
	};
	delete: ITodoRepository["delete"] = async (id) => {
		this.todo.delete({
			where: { id },
		});
	};
}

export const todoRepository = new TodoRepository(prisma.todo);
