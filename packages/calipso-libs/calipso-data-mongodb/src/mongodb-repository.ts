import { Schema, model, Model } from 'mongoose';
import { IRepository, GetAllParams, GetAllResponse, FindOneParams } from "calipso-ts";
import { plainToClass, plainToInstance } from "class-transformer";

// Implementa el repositorio usando Mongoose
export abstract class MongoRepository<TDomain extends { id?: any }, TKey = any, TDBModel = any> implements IRepository<TDomain, TKey> {
    populateFields: string[] = [];
    domainClass: any;
    _model!: Model<TDomain>;

    get Model() {
        return this._model;
    }

    constructor() {

    }

    abstract mapToDomain(dataBaseEntity: TDBModel): TDomain;

    setConfiguration(model: Model<TDomain>, entitySchema: Schema<TDomain>, domainClass: any) {
        this._model = model;
        // this._model = model<TDomain>(collectionName || domainClass.name, entitySchema);
        this.domainClass = domainClass;
        entitySchema.set('toObject', {
            transform: (_doc: any, ret) => {

                const obj = ret;

                for (const prop of this.populateFields) {
                    if (_doc[prop]) {
                        if (Array.isArray(_doc[prop])) {
                            // Es un array, así que manejamos cada elemento individualmente
                            obj[prop] = _doc[prop].map((item: any) => {
                                const newItem = JSON.parse(JSON.stringify(item));

                                if (newItem && newItem._id) {
                                    newItem.id = newItem._id;
                                    delete newItem._id;
                                    delete newItem.__v;
                                }

                                return newItem;
                            });
                        } else {
                            // No es un array, así que manejamos el elemento como antes
                            obj[prop] = JSON.parse(JSON.stringify(_doc[prop]));

                            if (obj[prop] && obj[prop]._id) {
                                obj[prop].id = obj[prop]._id;
                                delete obj[prop]._id;
                                delete obj[prop].__v;
                            }
                        }
                    }
                }


                obj.id = obj._id;
                delete obj._id;
                delete obj.__v;
                return obj;
            },
        });
    }

    async add(entity: TDomain): Promise<TKey> {
        const result = await this.Model.create(entity);
        entity.id = result._id;
        return result._id as TKey;
    }

    async update(entity: TDomain): Promise<void> {
        await this.Model.findByIdAndUpdate(entity.id, entity);
    }

    async get(id: TKey): Promise<TDomain> {
        const entity = await this.Model.findById(id).populate(this.populateFields).exec();
        // const entity = await this.Model.findById(id).populate(this.populateFields).exec();
        if (!entity) {
            // Aquí puedes manejar el caso en que no se encontró el documento con el id especificado
            // Por ejemplo, lanzar un error, devolver un valor predeterminado, etc.
            throw new Error('No se encontró el documento con el id especificado');
        }

        const entityObject = entity.toObject();

        return this.mapToDomain(entityObject as unknown as TDBModel);
    }

    async getWithNavigation(id: TKey): Promise<TDomain> {
        const entity = await this.Model.findById(id).populate(this.populateFields).exec();
        // const entity = await this.Model.findById(id).populate(this.populateFields).exec();
        if (!entity) {
            // Aquí puedes manejar el caso en que no se encontró el documento con el id especificado
            // Por ejemplo, lanzar un error, devolver un valor predeterminado, etc.
            throw new Error('No se encontró el documento con el id especificado');
        }
        return plainToInstance(this.domainClass, entity.toObject() as TDomain, {
            excludeExtraneousValues: false,
        });
    }

    async getAll(params: GetAllParams<TDomain>): Promise<GetAllResponse<TDomain>> {
        const { page, size } = params;

        // Convertir los parámetros de búsqueda en un objeto de consulta MongoDB con regex
        const query = {} as any;
        for (let p in params.find) {
            // query[p] = { $regex: params.find[p], $options: 'i' };
            query[p] = params.find[p];
        }

        // Usar el mismo objeto de consulta para obtener el conteo total de documentos
        const totalCount = await this.Model.countDocuments(query);

        // Obtener los documentos paginados basados en el objeto de consulta
        const entities = await this.Model.find(query)
            .skip((page - 1) * size)
            .limit(size)
            .populate(this.populateFields)
            .exec();

        return {
            page: page,
            size: size,
            total: 10,
            totalPages: Math.floor(totalCount / size) + 1,
            entities: entities.map(x => {
                x.id = (x._id as any).toString();
                delete (<any>x)._id;
                return this.mapToDomain(x as unknown as TDBModel);
            }),
        };
    }

    async delete(id: TKey): Promise<TDomain> {
        const entity = await this.Model.findByIdAndDelete(id);
        return this.mapToDomain(entity as unknown as TDBModel);
    }

    protected async findOne(params: FindOneParams<TDomain>): Promise<TDomain | null> {
        const query = {} as any;

        for (let p in params.find) {
            query[p] = { $regex: params.find[p], $options: 'i' };
        }

        // Usar el mismo objeto de consulta para obtener el conteo total de documentos
        const totalCount = await this.Model.countDocuments(query);

        // Obtener los documentos paginados basados en el objeto de consulta
        const entity = await this.Model.findOne(query)
            .populate(this.populateFields)
            .exec() as any;

        if (!entity) return null;

        entity.id = (entity._id as any).toString();
        delete entity._id;

        return plainToInstance(this.domainClass, entity.toObject() as TDomain, {
            excludeExtraneousValues: false,
        }) as TDomain;
    }

    protected async find(params: GetAllParams<TDomain>): Promise<GetAllResponse<TDomain>> {
        const { page, size } = params;

        // Convertir los parámetros de búsqueda en un objeto de consulta MongoDB con regex
        const query = {} as any;
        for (let p in params.find) {
            query[p] = { $regex: params.find[p], $options: 'i' };
        }

        // Usar el mismo objeto de consulta para obtener el conteo total de documentos
        const totalCount = await this.Model.countDocuments(query);

        // Obtener los documentos paginados basados en el objeto de consulta
        const entities = await this.Model.find(query)
            .skip((page - 1) * size)
            .limit(size)
            .populate(this.populateFields)
            .exec();

        return {
            page: page,
            total: 10,
            size: size,
            totalPages: Math.floor(totalCount / size) + 1,
            entities: entities.map(x => {
                x.id = (x._id as any).toString();
                delete (<any>x)._id;
                return plainToInstance(this.domainClass, x.toObject() as TDomain, {
                    excludeExtraneousValues: false,
                });
            }),
        };
    }
}