import { Schema, model } from "mongoose";
import { IUserRepository, User } from "app-core"
import { plainToInstance } from "class-transformer";
import { MongoRepository } from "calipso-data-mongodb";
import { GetAllResponse } from "calipso-ts";

const UserSchema = new Schema<User>({
    email: { type: String, required: true },
    name: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
});

const user = model("User", UserSchema);

export class UserMongoDBRepository extends MongoRepository<User, any> implements IUserRepository {

    mapToDomain(dataBaseEntity: any): User {
        return plainToInstance(User, dataBaseEntity);
    }

    constructor() {
        super();
        this.setConfiguration(user as any, UserSchema, User);
    }

    async getByName(name: string): Promise<GetAllResponse<User>> {
        return super.getAll({ page: 1, size: 10, find: { name: name } });
    }
}