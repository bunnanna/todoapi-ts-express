import { RequestHandler } from "express";
import { ITodoService, todoService } from "../Services/Todo";
import { ILocals, MessageDTO, NoPathParam } from "../dto";
import { CreateTodoDTO, ResTodoDTO, UpdateTodoDto } from "../dto/todo";

export interface ITodoController {
	createTodo: RequestHandler<
		NoPathParam,
		MessageDTO,
		CreateTodoDTO,
		unknown,
		ILocals
	>;
	getTodoList: RequestHandler<NoPathParam, ResTodoDTO[]>;
	getTodo: RequestHandler<{ id: string }, ResTodoDTO>;
	update: RequestHandler<
		{ id: string },
		MessageDTO,
		Partial<UpdateTodoDto>,
		unknown,
		ILocals
	>;
	delete: RequestHandler<{ id: string }, MessageDTO, unknown, unknown, ILocals>;
}

class TodoController implements ITodoController {
	constructor(private service: ITodoService) {}

	createTodo: ITodoController["createTodo"] = async (req, res) => {
		const createTodoBody = req.body;
		const userId = res.locals.userId;
		await this.service.create(createTodoBody, userId);
		return res.status(201).json({ message: "Todo Created" }).end();
	};
	getTodoList: ITodoController["getTodoList"] = async (req, res) => {
		const todo = await this.service.getAll();
		return res.json(todo).end();
	};
	getTodo: ITodoController["getTodo"] = async (req, res) => {
		const id = req.params.id;
		const todo = await this.service.getById(+id);
		return res.json(todo).end();
	};
	update: ITodoController["update"] = async (req, res) => {
		const id = req.params.id;
		const updateTodoBody = req.body;
		const userId = res.locals.userId;
		await this.service.update(updateTodoBody, +id, userId);
		return res.json({ message: "update completed." });
	};
	delete: ITodoController["delete"] = async (req, res) => {
		const id = req.params.id;
		const updateTodoBody = req.body;
		const userId = res.locals.userId;
		await this.service.delete(+id, userId);
		return res.json({ message: "delete completed." });
	};
}

export const todoController = new TodoController(todoService);
