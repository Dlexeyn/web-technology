import { ISettings, SettingsService } from './settings.service';
export declare class SettingsController {
    private settingsService;
    constructor(settingsService: SettingsService);
    get(): Promise<ISettings>;
    update(settings: ISettings): Promise<void>;
}
