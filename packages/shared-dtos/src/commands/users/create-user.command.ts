import { ICommand } from "@calipso/typescript-core";
import { UserDto } from "../users/user";

export class CreateUserCommand extends ICommand<UserDto> {
    readonly __typeFake?: UserDto;
    
    constructor(
        public readonly email: string,
        public readonly name: string,
    ) {
        super();
    }
}