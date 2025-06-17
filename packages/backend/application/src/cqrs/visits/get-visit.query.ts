import { ICommandHandler, Inject } from "@calipso/typescript-core";
import { VisitDto, GetAllVisitsQuery } from "app-shared-dtos";
import { inject } from "inversify";
import { IVisitRepository, VisitRepositorySymbol } from "app-core";
import { DynamicCommandHandler } from "../../decorators/dynamic-command-handler";

@DynamicCommandHandler(GetAllVisitsQuery)
export class GetVisitQueryHandler implements ICommandHandler<GetAllVisitsQuery, VisitDto> {

    constructor(@inject(VisitRepositorySymbol) private visitRepository: IVisitRepository) {
        console.log("GetVisitQueryHandler");
    }

    async handle(command: GetAllVisitsQuery): Promise<VisitDto> {
        const visit = await this.visitRepository.getAll();
        return visit;
    }

}