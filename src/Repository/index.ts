export interface IRepository<ReqBody, ResBody = ReqBody, ID = string> {
	GetAll: () => Promise<ResBody[]>;
	GetOneById: (id: ID) => Promise<ResBody>;
	Create: (createObject: ReqBody) => Promise<void>;
	Update: (id: ID, UpdateBody: Partial<ReqBody>) => Promise<void>;
	Delete: (id: ID) => Promise<void>;
}
