export class EnvConfig {
    CALLBACK_URL = "http://localhost:3000";
    KEYCLOAK_CLIENT_ID = "";
    KEYCLOAK_SECRET = "";
    KEYCLOAK_URL = "";
    KEYCLOAK_REALM = "";

    MONGO_DB_URL = "";

    DID_METHOD = "";
    BRIDGE_ID_URL = "";
    WEBHOOK_URL = "";
    WEBSOCKET_URL = "";

    VERIFIER_BUSINESS_NAME = "";
    VERIFIER_IMG_URL = "";
    VERIFIER_IMG_TITLE = "";
    VERIFIER_BACKGROUND_COLOR = "";
    VERIFIER_TEXT_COLOR = "";

    BRANDING_NAME = "";
    BRANDING_BODY = "";
    BRANDING_TITLE = "";
    BRANDING_SUBTITLE = "";
    BRANDING_ICON = "";

    constructor() {
        this.CALLBACK_URL = Bun.env.CALLBACK_URL || "";

        this.MONGO_DB_URL = Bun.env.MONGO_DB_URL || "";
        this.BRIDGE_ID_URL = Bun.env.BRIDGE_ID_URL || "";
        this.DID_METHOD = Bun.env.DID_METHOD || "";
        this.WEBHOOK_URL = Bun.env.WEBHOOK_URL || "";
        this.WEBSOCKET_URL = Bun.env.WEBSOCKET_URL || "";

        this.VERIFIER_BUSINESS_NAME = Bun.env.VERIFIER_BUSINESS_NAME || "";
        this.VERIFIER_IMG_URL = Bun.env.VERIFIER_IMG_URL || "";
        this.VERIFIER_IMG_TITLE = Bun.env.VERIFIER_IMG_TITLE || "";
        this.VERIFIER_BACKGROUND_COLOR = Bun.env.VERIFIER_BACKGROUND_COLOR || "";
        this.VERIFIER_TEXT_COLOR = Bun.env.VERIFIER_TEXT_COLOR || "";

        this.BRANDING_NAME = Bun.env.BRANDING_NAME || "";
        this.BRANDING_BODY = Bun.env.BRANDING_BODY || "";
        this.BRANDING_TITLE = Bun.env.BRANDING_TITLE || "";
        this.BRANDING_SUBTITLE = Bun.env.BRANDING_SUBTITLE || "";
        this.BRANDING_ICON = Bun.env.BRANDING_ICON || "";

        this.KEYCLOAK_CLIENT_ID = Bun.env.KEYCLOAK_CLIENT_ID || "";
        this.KEYCLOAK_SECRET = Bun.env.KEYCLOAK_SECRET || "";
        this.KEYCLOAK_URL = Bun.env.KEYCLOAK_URL || "";
        this.KEYCLOAK_REALM = Bun.env.KEYCLOAK_REALM || "";
    }
}