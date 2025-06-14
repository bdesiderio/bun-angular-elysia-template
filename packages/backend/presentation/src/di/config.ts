import { Container } from "inversify";
import { EnvConfig } from "../env";
import { KeycloakService } from "../services/login.service";
import { BridgeIDGateway } from "../services/bridge-id.gateway";
import { IdentityService } from "../services/identity.service";
import { BrandingService } from "../services/branding.service";
import { UserService } from "../services/user.service";

// import { Agent } from "@extrimian/agent-v2";
// const Agent = require("@extrimian/agent-v2").Agent;

export class ConfigDI {
    static configDI(container: Container) {
        container.bind<EnvConfig>(EnvConfig).to(EnvConfig).inSingletonScope();
        container.bind<KeycloakService>(KeycloakService).to(KeycloakService).inSingletonScope();
        container.bind<BridgeIDGateway>(BridgeIDGateway).to(BridgeIDGateway).inSingletonScope();
        container.bind<IdentityService>(IdentityService).to(IdentityService).inSingletonScope();
        container.bind<BrandingService>(BrandingService).to(BrandingService).inSingletonScope();
        container.bind<UserService>(UserService).to(UserService).inSingletonScope();

    }
}