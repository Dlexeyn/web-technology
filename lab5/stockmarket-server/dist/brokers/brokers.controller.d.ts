import { BrokersService, IBrokerName, IRawBroker, IUpdateBroker } from './brokers.service';
export declare class BrokersController {
    private readonly brokersService;
    constructor(brokersService: BrokersService);
    getAll(): Promise<import("./brokers.service").IBroker[]>;
    getOne(id: string): Promise<import("./brokers.service").IBroker>;
    getAllForBroker(id: string): Promise<import("./brokers.service").IBrokerStocks>;
    update(broker: IUpdateBroker, id: string): Promise<void>;
    remove(id: string): Promise<number>;
    login(data: IBrokerName): Promise<import("./brokers.service").IBroker>;
    getCash(id: string): Promise<number>;
    create(broker: IRawBroker): Promise<import("./brokers.service").IBroker>;
}
