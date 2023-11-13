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
exports.StocksService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const brokers_service_1 = require("../brokers/brokers.service");
let StocksService = class StocksService {
    constructor(brokerService) {
        this.brokerService = brokerService;
        const stocksData = fs.readFileSync(path.join(process.cwd(), './src/data/stocks.json'));
        this.stocks = JSON.parse(String(stocksData));
        const stocksHistoryData = fs.readFileSync(path.join(process.cwd(), './src/data/stocksHistory.json'));
        this.stocksHistory = JSON.parse(String(stocksHistoryData));
    }
    async getAllStocks() {
        return this.stocks;
    }
    async getAllForBroker(id) {
        let copyStocks = JSON.parse(JSON.stringify(this.stocks));
        const brokerStocks = await this.brokerService.getBrokerStocks(id);
        console.log(id);
        console.log(brokerStocks);
        for (let item of copyStocks) {
            let stock = brokerStocks.stocks.find((bstock) => {
                return bstock.id === item.id;
            });
            item.count = stock.count;
        }
        console.log(copyStocks);
        return copyStocks;
    }
    async getBrokerStocks(id) {
        return this.stocksHistory.find((history) => {
            return history.id === id;
        });
    }
    async getStocksHistory() {
        return this.stocksHistory;
    }
    async getStockHistory(id) {
        return this.stocksHistory.find((history) => {
            return history.id === id;
        });
    }
    saveChangesToFile() {
        const brokersData = JSON.stringify(this.stocks);
        fs.writeFileSync(path.join(process.cwd(), '\\src\\data\\stocks.json'), brokersData);
    }
};
exports.StocksService = StocksService;
exports.StocksService = StocksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [brokers_service_1.BrokersService])
], StocksService);
//# sourceMappingURL=stocks.service.js.map