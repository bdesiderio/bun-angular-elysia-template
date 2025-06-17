import { Container} from "inversify";
import { VisitRepositorySymbol } from "app-core";
import { VisitRepository } from "../repositories/visit-filesystem.repository";

export class AppInfrastructureFilesystemDBDIConfig {
    public static config(container: any, filepath: string = 'data') {
        console.log("AppInfrastructureFilesystemDBDIConfig", filepath);
        container.bind(VisitRepositorySymbol).to(VisitRepository);
    }
}
