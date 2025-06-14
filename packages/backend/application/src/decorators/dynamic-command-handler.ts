// Decorador personalizado
const staticClassNames: Map<any, any> = new Map();

export { staticClassNames as COMMAND_HANDLER_MAP, DynamicCommandHandler };

function DynamicCommandHandler(commandClass: any): ClassDecorator {
    return (target) => {
        // Puedes agregar metadatos adicionales aquí si es necesario
        Reflect.defineMetadata('dynamicInjectable', true, target);
        staticClassNames.set(commandClass, target);
    };
}