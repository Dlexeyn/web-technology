import { StocksService } from './stocks.service';
export declare class StocksController {
    private stocksService;
    constructor(stocksService: StocksService);
    getAll(): Promise<import("./stocks.service").IStocks[]>;
    getAllForBroker(id: string): Promise<import("./stocks.service").IStocksHistory>;
    getHistory(id: string): Promise<import("./stocks.service").IStocksHistory>;
}
