export interface IRepository<ReqBody, ResBody = ReqBody, ID = string> {
	getAll: () => Promise<ResBody[]>;
	getOneById: (id: ID) => Promise<ResBody>;
	create: (createObject: ReqBody) => Promise<void>;
	update: (id: ID, UpdateBody: Partial<ReqBody>) => Promise<void>;
	delete: (id: ID) => Promise<void>;
}
