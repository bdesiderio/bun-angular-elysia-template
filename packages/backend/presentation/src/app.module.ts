import Elysia from "elysia";
import { Container } from "inversify";
import { IController } from "./controllers/base.controller";

export class AppModule {
    constructor(private app: Elysia, private container: Container) {
        container.bind(Elysia).toConstantValue(app as any);
    }

    registerControllers(controllers: any[]) {
        controllers.forEach((x) => {
            this.container.bind(x).to(x).inSingletonScope();
            this.container.get<IController>(x).routes(this.app);
            this.container.get<IController>(x).initialize();
        });
    }
}