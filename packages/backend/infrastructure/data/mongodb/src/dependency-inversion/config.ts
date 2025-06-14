import { Container, decorate, injectable } from "inversify";
import { ContainerProvider } from "../providers/container";
import { UserRepositorySymbol} from "app-core";
import { UserMongoDBRepository } from "../repositories/user.mongodb.repository";
import { MongoDBInitialize, MongoRepository } from "calipso-data-mongodb";

export class DBoxVerifierMongoDBDIConfig {
    public static config(container: Container, connectionString: string) {
        decorate(injectable(), MongoRepository);
        MongoDBInitialize.initialize(connectionString)

        container.bind(ContainerProvider).toConstantValue(new ContainerProvider(container));
        container.bind(UserRepositorySymbol).to(UserMongoDBRepository);
    }
}
