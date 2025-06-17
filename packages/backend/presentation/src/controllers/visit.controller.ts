import { inject } from "inversify";
import { Get, Post, Put } from "../decorators/http.decorator";
import { BaseController } from "./base.controller";
import { Mediator } from "@calipso/typescript-core";
import { GetAllVisitsQuery, UpdateVisitCommand, VisitDto } from "app-shared-dtos";

export class VisitController extends BaseController {
    resource: string = "visits";

    constructor(@inject(Mediator) private mediator: Mediator) {
        super();
    }

    @Put("/record")
    async recordVisits(): Promise<void> {
        await this.mediator.send(new UpdateVisitCommand());
    }

    @Get("")
    async getVisits(): Promise<VisitDto> {
        const b = await this.mediator.send<VisitDto>(new GetAllVisitsQuery());
        return b;
    }
}