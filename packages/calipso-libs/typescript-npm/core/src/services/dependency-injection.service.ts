import "reflect-metadata";
import { Container, injectable, METADATA_KEY } from "inversify";
import { ICommand } from "../cqrs/icommand";
import { ICommandHandler } from "../cqrs/icommand.handler";

export class DIService {
    static container = new Container();

    static addCommand<TResult, TCommand extends ICommand<TResult>,
        TCommandHandler extends ICommandHandler<TCommand, TResult>>(
            command: new (...args: never[]) => TCommand,
            handler: new (...args: never[]) => TCommandHandler) {
        DIService.container.bind<TCommandHandler>(command.name).to(handler);
    }

    static addCommandToContainer<TResult, TCommand extends ICommand<TResult>,
        TCommandHandler extends ICommandHandler<TCommand, TResult>>(
            container: Container,
            command: new (...args: never[]) => TCommand,
            handler: new (...args: never[]) => TCommandHandler) {

        const isAlreadyInjectable = Reflect.hasOwnMetadata(METADATA_KEY.PARAM_TYPES, handler);

        if (!isAlreadyInjectable) {
            injectable()(handler);
        }
        
        container.bind<TCommandHandler>(command.name).to(handler);
    }
}