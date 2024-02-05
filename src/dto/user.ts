import { User } from "@prisma/client";

export interface ReqUserDTO extends Omit<User, "userId"> {}
export interface ResUserDTO extends Omit<User, "password"> {}
export interface LoginDTO extends Pick<User, "email" | "password"> {}
