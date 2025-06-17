import { ICommandHandler } from "@calipso/typescript-core";
import { GetAllVisitsQuery, UpdateVisitCommand } from "app-shared-dtos";
import { inject } from "inversify";
import { VisitRepositorySymbol, IVisitRepository } from "app-core";
import { DynamicCommandHandler } from "../../decorators/dynamic-command-handler";

interface UpdateVisitRequest {
}

@DynamicCommandHandler(UpdateVisitCommand)
export class UpdateVisitCommandHandler implements ICommandHandler<UpdateVisitCommand, void> {
    constructor(@inject(VisitRepositorySymbol) private visitRepository: IVisitRepository) {}

    async handle(command: UpdateVisitCommand & UpdateVisitRequest): Promise<void> {
        const visit = await this.visitRepository.getAll();
        visit.totalVisits++;
        if (command.isUniqueVisit) {
            visit.uniqueVisits++;
        }
        visit.lastVisit = new Date().toISOString();
        await this.visitRepository.update(visit);
    }
}