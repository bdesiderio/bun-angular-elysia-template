import "reflect-metadata";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

function createRouteDecorator(method: HttpMethod) {
  return function (path: string = "") {
    return function (target: any, propertyKey: any) {
      const routes = Reflect.getMetadata("routes", target.constructor) || [];
      routes.push({ method, path, handler: propertyKey });
      Reflect.defineMetadata("routes", routes, target.constructor);
    };
  };
}

export const Get = createRouteDecorator("GET");
export const Post = createRouteDecorator("POST");
export const Put = createRouteDecorator("PUT");
export const Delete = createRouteDecorator("DELETE");
