import { inject } from "inversify";
import { Get } from "../decorators/http.decorator";
import { BaseController } from "./base.controller";
import { GetBrandingConfigResponseDto } from "dbox-login-shared-dtos";
import { BrandingService } from "../services/branding.service";

export class BrandingController extends BaseController {
    resource: string = "branding";

    constructor(@inject(BrandingService) private brandingService: BrandingService) {
        super();
    }


    @Get("")
    async getBrandingConfig(): Promise<GetBrandingConfigResponseDto> {
        return await this.brandingService.getBranding();
    }
}