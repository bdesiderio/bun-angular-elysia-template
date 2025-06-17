import { Container } from "inversify";
import { EnvConfig } from "../env";
import { Mediator } from "@calipso/typescript-core";

// import { Agent } from "@extrimian/agent-v2";
// const Agent = require("@extrimian/agent-v2").Agent;

export class ConfigDI {
    static configDI(container: Container) {
        container.bind<EnvConfig>(EnvConfig).to(EnvConfig).inSingletonScope();
    }
}