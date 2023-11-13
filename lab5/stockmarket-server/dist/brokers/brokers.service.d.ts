export interface IStocksList {
    label: string;
    price: number;
    oldPrice: number;
}
export interface IRawBroker {
    name: string;
    cash: number;
}
export interface IBroker {
    id: number;
    name: string;
    cash: number;
    stocks?: IStocksList[];
}
export interface IUpdateBroker {
    id: number;
    name: string;
    cash: number;
}
export interface IBrokerName {
    username: string;
}
export interface IBrokerID {
    id: number;
}
export interface IStokeItem {
    id: number;
    count: number;
    price: number;
}
export interface IBrokerStocks {
    id: number;
    stocks?: IStokeItem[];
}
export declare class BrokersService {
    private brokers;
    private brokersStocks;
    constructor();
    getAllBrokers(): Promise<IBroker[]>;
    getOne(id: number): Promise<IBroker>;
    getBrokerStocks(id: number): Promise<IBrokerStocks>;
    signIn(username: string): Promise<IBroker>;
    create(rawBroker: IRawBroker): Promise<IBroker>;
    removeBroker(id: number): Promise<number>;
    update(id: number, updatedBroker: IUpdateBroker): Promise<void>;
    private getLastId;
    private saveChangesToFile;
    getBrokerCash(id: number): Promise<number>;
    setBrokerCash(id: number, newCash: number): Promise<void>;
}
