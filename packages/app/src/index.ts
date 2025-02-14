import { Elysia } from "elysia";
import { UserDTO } from "@workspace/ts-dto"

const app = new Elysia().get("/", () => {
  const user = new UserDTO();

  user.email = "bdesiderio@gmail.com"
  user.id = 1;
  user.name = "Brian";
  return { ...user };
}
).listen(3010);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
