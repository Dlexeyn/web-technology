"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const brokers_controller_1 = require("./brokers/brokers.controller");
const brokers_service_1 = require("./brokers/brokers.service");
const stocks_service_1 = require("./stocks/stocks.service");
const stocks_controller_1 = require("./stocks/stocks.controller");
const settings_controller_1 = require("./settings/settings.controller");
const settings_service_1 = require("./settings/settings.service");
const market_service_1 = require("./market/market.service");
const websocket_service_1 = require("./market/websocket/websocket.service");
const market_controller_1 = require("./market/market.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [app_controller_1.AppController, brokers_controller_1.BrokersController, stocks_controller_1.StocksController, settings_controller_1.SettingsController, market_controller_1.MarketController],
        providers: [app_service_1.AppService, brokers_service_1.BrokersService, stocks_service_1.StocksService, settings_service_1.SettingsService, market_service_1.MarketService, websocket_service_1.WebsocketService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map