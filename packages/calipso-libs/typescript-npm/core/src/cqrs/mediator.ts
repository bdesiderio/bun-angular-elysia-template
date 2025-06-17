import { Container } from "inversify";
import { Injectable } from "../dependency-injection/decorators/diconfig.decorator";
import { ICommand } from "./icommand";
import { ICommandHandler } from "./icommand.handler";
import { INotification } from "./inotification";
import { INotificationHandler } from "./inotification.handler";

export abstract class IMediator {
    abstract send<TCommand extends ICommand<any>>(command: TCommand): Promise<TCommand extends ICommand<infer TResult> ? TResult : never>;
    abstract notify<TNotification extends INotification>(command: TNotification): Promise<void>;
}

@Injectable(IMediator)
export class Mediator {
    container: Container;

    constructor(container: Container) {
        this.container = container;
    }

    async send<TResult>(command: ICommand<TResult>): Promise<TResult> {
        const handlers = await this.container.getAllAsync(command.constructor.name) as ICommandHandler<TResult, any>[];
        return await handlers[handlers.length - 1].handle(command as any);
    }

    async notify<TNotification extends INotification>(notification: TNotification): Promise<void> {
        const handlers = await this.container.getAllAsync(notification.constructor.name) as INotificationHandler<TNotification>[];
        handlers.forEach(x => x.handle(notification));
    }
}