import "reflect-metadata";
import { Elysia, t } from "elysia";
import { Container } from "inversify";
import { AppModule } from "./app.module";
import { ConfigDI } from "./di/config";
import cors from "@elysiajs/cors";
import { BrandingController } from "./controllers/brading.controller";
import { DBoxVerifierMongoDBDIConfig } from "dbox-login-infrastructure-mongodb";
import { VCLoginController } from "./controllers/vclogin.controller";
import dotenv from "dotenv";
import { WebhookController } from "./controllers/webhook.controller";
import { IIdentityRepository, IdentityRepositorySymbol } from "dbox-login-core";
import { IdentityService } from "./services/identity.service";
import { EnvConfig } from "./env";

dotenv.config();

const myContainer = new Container();

ConfigDI.configDI(myContainer);

let app = new Elysia();

app = app.onError((args) => {
  console.error("Error", args)
});

const module = new AppModule(app, myContainer);

// Dnd5CompanionCoreDIConfig.init(myContainer);
// Dnd5CompanionApplicationDIConfig.init(myContainer);

DBoxVerifierMongoDBDIConfig.config(myContainer, myContainer.get(EnvConfig).MONGO_DB_URL);
// Dnd5CompanionDataTypeORMBDIConfig.config(myContainer, {
//   type: "mariadb",
//   host: "localhost",
//   port: 3306,
//   username: "root",
//   password: "root",
//   database: "database-name",
// });

// myContainer.bind(AuthServiceSymbol).to(JWTAuthService).inSingletonScope();
// myContainer.bind(FileServiceSymbol).to(ConcreteFileService).inSingletonScope();

module.registerControllers([
  BrandingController,
  VCLoginController,
  WebhookController
]);

const identityRepository = myContainer.get<IdentityService>(IdentityService);
identityRepository.createIdentityIfNotExist();

app.use(cors({ credentials: true, origin: true }))
  .listen({ port: 3030, idleTimeout: 60 });

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

