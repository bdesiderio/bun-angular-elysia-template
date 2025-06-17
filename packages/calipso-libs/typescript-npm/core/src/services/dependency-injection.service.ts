import { Container, decorate, injectable } from "inversify";
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

        // Si el handler no es decorado aún, decoralo dinámicamente
        try {
            decorate(injectable(), handler);
        } catch (e) {
            // Si ya estaba decorado, no hacer nada
            if (!(e instanceof Error && e.message.includes('Cannot apply @injectable decorator multiple times'))) {
                throw e;
            }
        }

        container.bind<TCommandHandler>(command.name).to(handler);
    }
}