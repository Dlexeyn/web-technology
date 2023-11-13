import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MarketService } from '../market.service';
import { SettingsService } from '../../settings/settings.service';

@WebSocketGateway(5001, { transports: ['websocket'] })
export class WebsocketService {
  @WebSocketServer() private server: Server;
  private timer: any;

  constructor(
    private marketService: MarketService,
    private settingsService: SettingsService,
  ) {}

  private isStarted() {
    return this.settingsService.getSettings();
  }

  private incr_date(date_str: string){
    let parts = date_str.split("-");
    let dt = new Date(
        parseInt(parts[0], 10),      // year
        parseInt(parts[1], 10) - 1,  // month (starts with 0)
        parseInt(parts[2], 10)       // date
    );
    dt.setDate(dt.getDate() + 1);
    parts[0] = "" + dt.getFullYear();
    parts[1] = "" + (dt.getMonth() + 1);
    if (parts[1].length < 2) {
      parts[1] = "0" + parts[1];
    }
    parts[2] = "" + dt.getDate();
    if (parts[2].length < 2) {
      parts[2] = "0" + parts[2];
    }
    return parts.join("-");
  }

  private async getTime() {
    let settings = this.settingsService.getSettings();
    let newDate = this.incr_date(settings.currentDate);
    await this.settingsService.setCurrentDate(newDate);
    return newDate;
  }

  private clearTimer() {
    if (this.timer !== null) {
      clearInterval(this.timer);
    }
  }

  @SubscribeMessage('update')
  async onUpdateEvent(client: Socket) {
    console.log("onUpdateEvent");
    const {dateChangeSpeed} = this.settingsService.getSettings();
    if (this.isStarted()) {
      await this.settingsService.setStatus(true);
      let { updatedStocks, historyIndex } =
        await this.marketService.startTrading();
      this.clearTimer();
      let time = await this.getTime();
      this.server.emit('update', { time, updatedStocks });
      this.timer = setInterval(async () => {
        const newTime = await this.getTime();
        if (updatedStocks && historyIndex > 0 && this.isStarted()) {
          const updatedStocks = await this.marketService.updateWithNewPrice(--historyIndex);
          this.server.emit('update', { newTime, updatedStocks });
        } else if(historyIndex === 0){
          const updatedStocks = await this.marketService.updateWithNewPrice(historyIndex);
          this.server.emit('update', { newTime, updatedStocks });
        }
      }, 1000 * dateChangeSpeed);
    }
  }

  @SubscribeMessage('stop')
  async onStopTrading(client: Socket) {
    console.log("onStopTrading");
    await this.settingsService.setStatus(true);
    this.server.emit('stop');
    this.clearTimer();
  }

  afterInit(server: Server): any {
    console.log('Init');
  }

  handleConnection(client: Socket, ...args: any[]): any {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): any {
    this.server.emit('updatingPrices', [5, 6, 7])
    console.log(`Client disconnected: ${client.id}`);
  }
}
