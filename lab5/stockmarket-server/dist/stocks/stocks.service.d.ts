import { BrokersService } from "../brokers/brokers.service";
export interface IStocks {
    id: number;
    label: string;
    name: string;
    price: number;
}
interface IStockData {
    date: string;
    open: string;
}
export interface IStocksHistory {
    id: number;
    label: string;
    stocks: IStockData[];
}
export declare class StocksService {
    private brokerService;
    private stocks;
    private stocksHistory;
    constructor(brokerService: BrokersService);
    getAllStocks(): Promise<IStocks[]>;
    getAllForBroker(id: number): Promise<any>;
    getBrokerStocks(id: number): Promise<IStocksHistory>;
    getStocksHistory(): Promise<IStocksHistory[]>;
    getStockHistory(id: number): Promise<IStocksHistory>;
    private saveChangesToFile;
}
export {};
