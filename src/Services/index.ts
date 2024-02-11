export interface ICRUDService<ReqBody, ResBody = ReqBody, id = string> {
	create: (createBody: ReqBody) => Promise<void>;
	getAll: () => Promise<ResBody[]>;
	getById: (id: id) => Promise<ResBody>;
	update: (updateBody: Partial<ReqBody>) => Promise<void>;
	delete: (id: id) => Promise<void>;
}
