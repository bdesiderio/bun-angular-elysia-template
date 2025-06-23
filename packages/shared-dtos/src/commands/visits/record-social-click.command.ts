import { ICommand } from "@calipso/typescript-core";

export class RecordSocialClickCommand extends ICommand<void> {
    platform: 'youtube' | 'instagram' | 'twitch' = 'youtube';
} 