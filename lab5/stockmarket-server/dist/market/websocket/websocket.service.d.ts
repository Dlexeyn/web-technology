import { Server, Socket } from 'socket.io';
import { MarketService } from '../market.service';
import { SettingsService } from '../../settings/settings.service';
export declare class WebsocketService {
    private marketService;
    private settingsService;
    private server;
    private timer;
    constructor(marketService: MarketService, settingsService: SettingsService);
    private isStarted;
    private incr_date;
    private getTime;
    private clearTimer;
    onUpdateEvent(client: Socket): Promise<void>;
    onStopTrading(client: Socket): Promise<void>;
    afterInit(server: Server): any;
    handleConnection(client: Socket, ...args: any[]): any;
    handleDisconnect(client: Socket): any;
}
