import { inject } from "inversify";
import { Get, Post, Put } from "../decorators/http.decorator";
import { BaseController } from "./base.controller";
import { Mediator } from "@calipso/typescript-core";
import { GetAllVisitsQuery, UpdateVisitCommand, VisitDto, RecordSocialClickCommand } from "app-shared-dtos";
import { Body } from "../decorators/query.decorator";

export class VisitController extends BaseController {
    resource: string = "visits";

    constructor(@inject(Mediator) private mediator: Mediator) {
        super();
    }

    @Put("/record")
    async recordVisits(@Body(UpdateVisitCommand) request): Promise<void> {
        await this.mediator.send(request);
    }

    @Put("/social-click")
    async recordSocialClick(@Body(RecordSocialClickCommand) request): Promise<void> {
        await this.mediator.send(request);
    }

    @Get("")
    async getVisits(): Promise<VisitDto> {
        const b = await this.mediator.send<VisitDto>(new GetAllVisitsQuery());
        return b;
    }
}