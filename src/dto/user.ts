export interface ReqUserDTO {
	name: string;
	email: string;
	password: string;
	image: string | null;
}
export interface ResUserDTO {
	userId: string;
	name: string;
	email: string;
	image: string | null;
}
export interface LoginDTO {
	email: string;
	password: string;
}
