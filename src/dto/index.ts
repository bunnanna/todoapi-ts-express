export interface MessageDTO {
	message: string;
}

export interface NoPathParam {}

export interface ILocals {
	userId: string;
}

export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};
