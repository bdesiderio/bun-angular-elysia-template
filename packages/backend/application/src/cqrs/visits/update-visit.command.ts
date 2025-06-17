import { ICommandHandler } from "@calipso/typescript-core";
import { GetAllVisitsQuery, UpdateVisitCommand } from "app-shared-dtos";
import { inject } from "inversify";
import { VisitRepositorySymbol, IVisitRepository } from "app-core";
import { DynamicCommandHandler } from "../../decorators/dynamic-command-handler";

@DynamicCommandHandler(UpdateVisitCommand)
export class UpdateVisitCommandHandler implements ICommandHandler<UpdateVisitCommand, void> {

    constructor(@inject(VisitRepositorySymbol) private visitRepository: IVisitRepository) {

    }

    async handle(command: GetAllVisitsQuery): Promise<void> {
        const visit = await this.visitRepository.getAll();
        visit.totalVisits++;
        visit.lastVisit = new Date().toISOString();
        console.log(visit);
        await this.visitRepository.update(visit);
    }

}