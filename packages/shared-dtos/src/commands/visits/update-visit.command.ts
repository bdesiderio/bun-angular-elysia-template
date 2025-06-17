import { ICommand } from "@calipso/typescript-core";

export class UpdateVisitCommand extends ICommand<void> {
    isUniqueVisit: boolean = false;
}