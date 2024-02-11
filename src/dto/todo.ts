import { Todo } from "@prisma/client";
import { Prettify } from ".";
import { ResUserDTO } from "./user";

export interface CreateTodoDTO extends Omit<Todo, "user" | "userId" | "id"> {}
export interface UpdateTodoDto extends Omit<Todo, "user"> {}
export interface ResTodoDTO extends Omit<Todo, "userId"> {
	user: ResUserDTO;
}

type a = Prettify<CreateTodoDTO>;
