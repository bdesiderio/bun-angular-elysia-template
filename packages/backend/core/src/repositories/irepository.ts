export interface IRepository<TEntity, TKey = any> {
    add(entity: TEntity): Promise<TKey>;
    update(entity: TEntity): Promise<void>;
    get(id: TKey): Promise<TEntity | null>;
    getWithNavigation(id: TKey): Promise<TEntity | null>;
    getAll(params: GetAllParams): Promise<GetAllResponse<TEntity>>;
    delete(id: TKey): Promise<TEntity>
}

export class GetAllResponse<TEntity> {
    page!: number;
    size!: number;
    totalPages!: number;
    total!: number;
    entities!: TEntity[];
}
export interface GetAllParams<TEntity = any> {
    page: number;
    size: number;
    find?: Partial<TEntity>;
    filter?: any;
}

export interface FindOneParams<TEntity = any> {
    find?: Partial<TEntity>;
    filter?: any;
}
