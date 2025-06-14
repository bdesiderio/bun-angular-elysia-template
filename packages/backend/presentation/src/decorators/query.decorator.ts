export function Param(paramName: string, type: any = String) {
    return function (target: any, propertyKey: any, parameterIndex: number) {
        const params = Reflect.getMetadata("params", target, propertyKey) || [];
        params.push({ index: parameterIndex, paramName, type });
        Reflect.defineMetadata("params", params, target, propertyKey);
    };
}

export function Query(queryName: string, type: any = String) {
    return function (target: any, propertyKey: any, parameterIndex: number) {
        const queries = Reflect.getMetadata("queries", target, propertyKey) || [];
        queries.push({ index: parameterIndex, queryName, type });
        Reflect.defineMetadata("queries", queries, target, propertyKey);
    };
}

export function Body(dtoClass?: new () => any) {
    return function (target: any, propertyKey: any, parameterIndex: number) {
        Reflect.defineMetadata("bodyIndex", parameterIndex, target, propertyKey);
        if (dtoClass) {
            Reflect.defineMetadata("bodyType", dtoClass, target, propertyKey);
        }
    };
}


/**
 * Decorador para agregar un guard (middleware) a un controlador.
 * @param guardMiddleware Middleware que se ejecutará antes de las rutas del controlador.
 */
export function Guard(guardMiddleware: any) {
    return function (target: any) {
        Reflect.defineMetadata("guard", guardMiddleware, target);
    };
}
