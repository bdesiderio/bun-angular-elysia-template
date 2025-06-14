import { Container } from 'inversify';
import { DIService, Mediator } from '@calipso/typescript-core';
import { COMMAND_HANDLER_MAP } from "../decorators/dynamic-command-handler";
export class Dnd5CompanionApplicationDIConfig {
    static container: Container;
    static b = false;
    static init(container: Container) {
        Dnd5CompanionApplicationDIConfig.container = container;

        // container.bind<UpdateEntityGuardService>(UpdateEntityGuardService).to(UpdateEntityGuardService).inSingletonScope();

        for (let v of Array.from(COMMAND_HANDLER_MAP.keys())) {
            DIService.addCommandToContainer(container, v, COMMAND_HANDLER_MAP.get(v));
        }

        container.bind<Mediator>(Mediator).toConstantValue(new Mediator(container));

    }
}