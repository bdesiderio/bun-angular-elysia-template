import { IRepository } from "thxu-data";
import { Container } from "inversify";

export class ContainerProvider {
    _container: Container;

    getContainer() {
        return this._container;
    }

    constructor(container: Container) {
        this._container = container;
    }
}