import Elysia from "elysia";
import { plainToInstance } from "class-transformer";

export abstract class BaseController implements IController {
    // @inject(Elysia) private app!: Elysia

    abstract resource: string;

    constructor() {

    }

    routes(app: Elysia): void {
        const routes = Reflect.getMetadata("routes", this.constructor) || [];
        const guardMiddleware = Reflect.getMetadata("guard", this.constructor); // 🔥 Obtener el guard del controlador

        routes.forEach(({ method, path, handler }) => {
            const fullPath = `/${this.resource}${path}`;
            const controllerInstance = this as any;

            const paramMetadata = Reflect.getMetadata("params", this, handler) || [];
            const queryMetadata = Reflect.getMetadata("queries", this, handler) || [];
            const bodyIndex = Reflect.getMetadata("bodyIndex", this, handler);
            const bodyType = Reflect.getMetadata("bodyType", this, handler);

            // 🔥 Aplicar el middleware antes de la ruta si el controlador tiene un Guard
            let routeHandler = async (context) => {
                const args: any[] = [];

                paramMetadata.forEach(({ index, paramName, type }) => {
                    let value: any = context.params[paramName];

                    if (type === Number) value = value !== undefined ? Number(value) : null;
                    else if (type === Boolean) value = value === "true";
                    else if (type === String) value = value ?? null;

                    args[index] = value;
                });

                queryMetadata.forEach(({ index, queryName, type }) => {
                    let value: any = context.query[queryName];

                    if (type === Number) value = value !== undefined ? Number(value) : null;
                    else if (type === Boolean) value = value === "true";
                    else if (type === String) value = value ?? null;

                    args[index] = value;
                });

                if (bodyIndex !== undefined) {
                    let bodyData = context.body;
                    if (bodyType) {
                        bodyData = plainToInstance(bodyType, bodyData);
                    }
                    args[bodyIndex] = bodyData;
                }

                const result = await controllerInstance[handler](...args);
                // return JSON.stringify(result);

                if(result instanceof Response) {
                    return result;
                }

                if (result)
                    return JSON.stringify(result);
                
                return null;
            };

            // Si hay un guard, encadenarlo antes de ejecutar la ruta
            if (guardMiddleware) {
                routeHandler = guardMiddleware(routeHandler);
            }

            app[method.toLowerCase() as "get" | "post" | "put" | "delete"](fullPath, routeHandler);
        });
    }

    initialize(): void {
        // console.log(this.app);
    }
}

interface IController {
    routes(app: any): void;
    initialize(): void;
}

export { IController }