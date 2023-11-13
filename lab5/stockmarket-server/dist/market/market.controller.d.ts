import { IBuyData, MarketService } from "./market.service";
export declare class MarketController {
    private marketService;
    constructor(marketService: MarketService);
    buy(data: IBuyData): Promise<any>;
    sell(data: IBuyData): Promise<any>;
}
