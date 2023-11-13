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
var MarketService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketService = void 0;
const common_1 = require("@nestjs/common");
const settings_service_1 = require("../settings/settings.service");
const stocks_service_1 = require("../stocks/stocks.service");
const brokers_service_1 = require("../brokers/brokers.service");
let MarketService = MarketService_1 = class MarketService {
    constructor(settingsService, stocksService, brokerService) {
        this.settingsService = settingsService;
        this.stocksService = stocksService;
        this.brokerService = brokerService;
    }
    async startTrading() {
        const { startDate, usedStocks } = this.settingsService.getSettings();
        this.selectedIds = MarketService_1.getSelectedIds(usedStocks);
        this.stocksHistory = await this.stocksService.getStocksHistory();
        const historyIndex = this.findHistoryIndex(new Date(startDate));
        const updatedStocks = await this.updateWithNewPrice(historyIndex);
        return { updatedStocks, historyIndex };
    }
    static getSelectedIds(usedStocks) {
        const ids = [];
        for (const stock of usedStocks) {
            ids.push(stock.id);
        }
        return ids;
    }
    findHistoryIndex(startDate) {
        let currentDate;
        for (const [index, stock] of this.stocksHistory[1].stocks.entries()) {
            currentDate = new Date(stock.date);
            if (currentDate <= startDate) {
                return index;
            }
        }
        return this.stocksHistory[1].stocks.length - 1;
    }
    async updateWithNewPrice(historyIndex) {
        const stocks = await this.stocksService.getAllStocks();
        const selectedStocks = stocks.filter((stock) => this.selectedIds.includes(stock.id));
        const updatedStocks = selectedStocks.map((stock) => {
            const data = this.stocksHistory.find((item) => item.id === stock.id).stocks;
            return {
                id: stock.id,
                label: stock.label,
                name: stock.name,
                price: parseFloat(data[historyIndex].open),
            };
        });
        return JSON.parse(JSON.stringify(updatedStocks));
    }
    async buy(data) {
        console.log(data);
        let brokerCash = await this.brokerService.getBrokerCash(data.brokerId);
        let updatedBrokerCash = brokerCash - data.count * data.price;
        if (updatedBrokerCash >= 0) {
            let brokerStocks = await this.brokerService.getBrokerStocks(data.brokerId);
            console.log(brokerStocks);
            let buyingStock = brokerStocks.stocks.find((item) => {
                return item.id === data.stockId;
            });
            buyingStock.price = data.price;
            let copyBuyingStock = JSON.parse(JSON.stringify(buyingStock));
            copyBuyingStock.count = data.count;
            buyingStock.count += data.count;
            await this.brokerService.setBrokerCash(data.brokerId, updatedBrokerCash);
            return copyBuyingStock;
        }
        return { error: 'Not enough cash to buy!' };
    }
    async sell(data) {
        console.log(data);
        let brokerStocks = await this.brokerService.getBrokerStocks(data.brokerId);
        console.log(brokerStocks);
        let sellingStock = brokerStocks.stocks.find((item) => {
            return item.id === data.stockId;
        });
        if (sellingStock.count >= data.count) {
            let copySellingStock = JSON.parse(JSON.stringify(sellingStock));
            sellingStock.count -= data.count;
            copySellingStock.count = data.count;
            let brokerCash = await this.brokerService.getBrokerCash(data.brokerId);
            await this.brokerService.setBrokerCash(data.brokerId, brokerCash + data.count * data.price);
            return copySellingStock;
        }
        return { error: 'Incorrect count!' };
    }
};
exports.MarketService = MarketService;
exports.MarketService = MarketService = MarketService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [settings_service_1.SettingsService,
        stocks_service_1.StocksService,
        brokers_service_1.BrokersService])
], MarketService);
//# sourceMappingURL=market.service.js.map