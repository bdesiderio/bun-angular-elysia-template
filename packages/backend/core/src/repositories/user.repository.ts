import { GetAllResponse } from "calipso-ts";
import { User } from "../models/user";

export const UserRepositorySymbol = Symbol.for("UserRepositorySymbol");

export interface IUserRepository {
    add(entity: User): Promise<{ id: any }>;
    getByName(name: string): Promise<GetAllResponse<User>>;
    // update(id: User): Promise<void>;
}