import { ResUserDTO } from "./user";

export interface CreateTodoDTO {
	title: string;
}
export interface UpdateTodoDto {
	title: string;
}
export interface ResTodoDTO {
	user: ResUserDTO;
	id: number;
	title: string;
	isCompleted: boolean;
	CreatedAt: Date;
}
