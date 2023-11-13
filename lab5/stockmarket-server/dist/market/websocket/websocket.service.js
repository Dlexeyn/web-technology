"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketService = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const market_service_1 = require("../market.service");
const settings_service_1 = require("../../settings/settings.service");
let WebsocketService = class WebsocketService {
    constructor(marketService, settingsService) {
        this.marketService = marketService;
        this.settingsService = settingsService;
    }
    isStarted() {
        return this.settingsService.getSettings();
    }
    incr_date(date_str) {
        let parts = date_str.split("-");
        let dt = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
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
    async getTime() {
        let settings = this.settingsService.getSettings();
        let newDate = this.incr_date(settings.currentDate);
        await this.settingsService.setCurrentDate(newDate);
        return newDate;
    }
    clearTimer() {
        if (this.timer !== null) {
            clearInterval(this.timer);
        }
    }
    async onUpdateEvent(client) {
        console.log("onUpdateEvent");
        const { dateChangeSpeed } = this.settingsService.getSettings();
        if (this.isStarted()) {
            await this.settingsService.setStatus(true);
            let { updatedStocks, historyIndex } = await this.marketService.startTrading();
            this.clearTimer();
            let time = await this.getTime();
            this.server.emit('update', { time, updatedStocks });
            this.timer = setInterval(async () => {
                const newTime = await this.getTime();
                if (updatedStocks && historyIndex > 0 && this.isStarted()) {
                    const updatedStocks = await this.marketService.updateWithNewPrice(--historyIndex);
                    this.server.emit('update', { newTime, updatedStocks });
                }
                else if (historyIndex === 0) {
                    const updatedStocks = await this.marketService.updateWithNewPrice(historyIndex);
                    this.server.emit('update', { newTime, updatedStocks });
                }
            }, 1000 * dateChangeSpeed);
        }
    }
    async onStopTrading(client) {
        console.log("onStopTrading");
        await this.settingsService.setStatus(true);
        this.server.emit('stop');
        this.clearTimer();
    }
    afterInit(server) {
        console.log('Init');
    }
    handleConnection(client, ...args) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.server.emit('updatingPrices', [5, 6, 7]);
        console.log(`Client disconnected: ${client.id}`);
    }
};
exports.WebsocketService = WebsocketService;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WebsocketService.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], WebsocketService.prototype, "onUpdateEvent", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('stop'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], WebsocketService.prototype, "onStopTrading", null);
exports.WebsocketService = WebsocketService = __decorate([
    (0, websockets_1.WebSocketGateway)(5001, { transports: ['websocket'] }),
    __metadata("design:paramtypes", [market_service_1.MarketService,
        settings_service_1.SettingsService])
], WebsocketService);
//# sourceMappingURL=websocket.service.js.map