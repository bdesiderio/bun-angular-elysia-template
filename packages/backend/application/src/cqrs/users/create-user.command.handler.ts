import { CreateUserCommand, UserDto } from "app-shared-dtos";
import { IUserRepository, User, UserRepositorySymbol } from "app-core";
import { inject } from "inversify";
import { plainToInstance } from "class-transformer";
import { ICommandHandler } from "@calipso/typescript-core";
import { DynamicCommandHandler } from "../../decorators/dynamic-command-handler";

@DynamicCommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand, UserDto> {

    constructor(@inject(UserRepositorySymbol) private readonly userRepository: IUserRepository) {

    }

    async handle(command: CreateUserCommand): Promise<UserDto> {
        const user = new User();
        user.email = command.email;
        user.name = command.name;
        user.createdAt = new Date();
        user.updatedAt = new Date();

        await this.userRepository.add(user);
        return plainToInstance(UserDto, user);
    }
}