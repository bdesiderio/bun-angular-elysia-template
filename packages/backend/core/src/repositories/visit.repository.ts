import { Visit } from "../models/visit";

export const VisitRepositorySymbol = Symbol.for("VisitRepositorySymbol");

export interface IVisitRepository {
    update(entity: Visit): Promise<void>;
    getAll(): Promise<Visit>;
}