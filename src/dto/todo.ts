import { Todo } from "@prisma/client";
import { ResUserDTO } from "./user";

export interface ReqTodoDTO extends Omit<Todo, "user" | "userID" | "id"> {}
export interface ResTodoDTO extends Omit<Todo, "userId"> {
	user: ResUserDTO;
}
