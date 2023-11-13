import { IStocks } from '../stocks/stocks.service';
export interface ISettings {
    startDate: string;
    dateChangeSpeed: number;
    usedStocks: IStocks[];
    isStarted: boolean;
    currentDate: string;
}
export declare class SettingsService {
    private settings;
    constructor();
    private saveChangesToFile;
    getSettings(): ISettings;
    updateSettings(newSettings: ISettings): Promise<void>;
    setCurrentDate(newDate: string): Promise<void>;
    setStatus(newStatus: boolean): Promise<void>;
}
