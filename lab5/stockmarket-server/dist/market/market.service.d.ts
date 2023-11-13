import { SettingsService } from '../settings/settings.service';
import { StocksService } from "../stocks/stocks.service";
import { BrokersService } from "../brokers/brokers.service";
export interface IBuyData {
    brokerId: number;
    stockId: number;
    price: number;
    count: number;
}
export declare class MarketService {
    private settingsService;
    private stocksService;
    private brokerService;
    private selectedIds;
    private stocksHistory;
    constructor(settingsService: SettingsService, stocksService: StocksService, brokerService: BrokersService);
    startTrading(): Promise<{
        updatedStocks: any;
        historyIndex: number;
    }>;
    private static getSelectedIds;
    private findHistoryIndex;
    updateWithNewPrice(historyIndex: number): Promise<any>;
    buy(data: IBuyData): Promise<any>;
    sell(data: IBuyData): Promise<any>;
}
