import { User } from "@prisma/client";

export interface ReqUserDTO extends User {}
export interface ResUserDTO extends Omit<User, "password"> {}
