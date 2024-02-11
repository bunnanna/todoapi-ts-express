export interface IRepository<
	CreateBody,
	ID = string,
	ResBody = CreateBody,
	UpdateBody = Partial<CreateBody>
> {
	getAll: () => Promise<ResBody[]>;
	getOneById: (id: ID) => Promise<ResBody>;
	create: (createObject: CreateBody) => Promise<void>;
	update: (id: ID, UpdateBody: Partial<UpdateBody>) => Promise<void>;
	delete: (id: ID) => Promise<void>;
}
