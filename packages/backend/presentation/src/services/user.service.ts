import { UserRepositorySymbol, IUserRepository, User } from "dbox-login-core";
import { inject } from "inversify";
import { KeycloakService } from "./login.service";

export class UserService {
    constructor(
        @inject(UserRepositorySymbol) private userRepository: IUserRepository,
        @inject(KeycloakService) private keycloakService: KeycloakService,
    ) {

    }

    async createUser(params: {
        did: string,
        username: string,
        firstName: string,
        lastName: string
    }) {
        this.keycloakService.createUser
        await this.keycloakService.createUser(params);
        await this.userRepository.add({
            id: null,
            did: params.did,
            username: params.username,
            firstName: params.firstName,
            lastName: params.lastName
        });
    }

    async getUserByDid(did: string): Promise<User | null> {
        const user = await this.userRepository.getByDid(did);

        if (!user) {
            return null;
        }

        return user;
    }
}