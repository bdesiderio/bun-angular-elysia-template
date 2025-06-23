import { ICommandHandler } from "@calipso/typescript-core";
import { RecordSocialClickCommand } from "app-shared-dtos";
import { inject } from "inversify";
import { VisitRepositorySymbol, IVisitRepository } from "app-core";
import { DynamicCommandHandler } from "../../decorators/dynamic-command-handler";

@DynamicCommandHandler(RecordSocialClickCommand)
export class RecordSocialClickCommandHandler implements ICommandHandler<RecordSocialClickCommand, void> {
    constructor(@inject(VisitRepositorySymbol) private visitRepository: IVisitRepository) {}

    async handle(command: RecordSocialClickCommand): Promise<void> {
        const visit = await this.visitRepository.getAll();
        
        // Initialize socialClicks if it doesn't exist
        if (!visit.socialClicks) {
            visit.socialClicks = {
                youtube: 0,
                instagram: 0,
                twitch: 0
            };
        }
        
        // Increment the specific platform counter
        visit.socialClicks[command.platform]++;
        
        await this.visitRepository.update(visit);
    }
} 