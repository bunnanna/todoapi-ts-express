import { ICRUDService } from ".";
import { ITodoRepository, todoRepository } from "../Repository/Todo";
import { CreateTodoDTO, ResTodoDTO, UpdateTodoDto } from "../dto/todo";

export interface ITodoService
	extends Omit<
		ICRUDService<CreateTodoDTO, ResTodoDTO, number>,
		"create" | "update" | "delete"
	> {
	create: (createBody: CreateTodoDTO, userId: string) => Promise<void>;
	update: (
		updateBody: Partial<UpdateTodoDto>,
		id: number,
		userId: string
	) => Promise<void>;
	delete: (id: number, userId: string) => Promise<void>;
}

class TodoService implements ITodoService {
	constructor(private todoRepo: ITodoRepository) {}

	private isOwner = async (id: number, userId: string): Promise<boolean> => {
		const todo = await this.todoRepo.getOneById(id);
		return todo.user.userId === userId;
	};

	create: ITodoService["create"] = async (createBody, userId) => {
		this.todoRepo.create({ ...createBody, userId });
	};
	getAll: ITodoService["getAll"] = async () => {
		return this.todoRepo.getAll();
	};
	getById: ITodoService["getById"] = async (id) => {
		return this.todoRepo.getOneById(id);
	};
	update: ITodoService["update"] = async (updateBody, id, userId) => {
		if (!(await this.isOwner(id, userId))) new Error("Forbidden");
		this.todoRepo.update(id, updateBody);
	};
	delete: ITodoService["delete"] = async (id, userId) => {
		if (!(await this.isOwner(id, userId))) new Error("Forbidden");
		return this.todoRepo.delete(id);
	};
}

export const todoService = new TodoService(todoRepository);
