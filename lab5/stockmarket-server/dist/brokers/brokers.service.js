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
exports.BrokersService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let BrokersService = class BrokersService {
    constructor() {
        const brokersData = fs.readFileSync(path.join(process.cwd(), './src/data/brokers.json'));
        const brokersStocksData = fs.readFileSync(path.join(process.cwd(), './src/data/brokerStocks.json'));
        this.brokers = JSON.parse(String(brokersData));
        this.brokersStocks = JSON.parse(String(brokersStocksData));
    }
    async getAllBrokers() {
        return this.brokers;
    }
    async getOne(id) {
        return this.brokers.find((broker) => {
            return broker.id === id;
        });
    }
    async getBrokerStocks(id) {
        console.log(id);
        return this.brokersStocks.find((item) => {
            return item.id === id;
        });
    }
    async signIn(username) {
        return this.brokers.find((broker) => {
            return broker.name === username;
        });
    }
    async create(rawBroker) {
        const newBroker = {
            id: this.getLastId() + 1,
            name: rawBroker.name,
            cash: rawBroker.cash,
        };
        const newBrokerStocks = {
            id: newBroker.id,
            stocks: []
        };
        for (let i = 1; i <= 8; i++) {
            let item = { id: i, count: 0, price: 0 };
            newBrokerStocks.stocks.push(item);
        }
        this.brokers.push(newBroker);
        this.brokersStocks.push(newBrokerStocks);
        this.saveChangesToFile();
        return newBroker;
    }
    async removeBroker(id) {
        let index = this.brokers.findIndex((broker) => {
            return broker.id === id;
        });
        this.brokers.splice(index, 1);
        index = this.brokersStocks.findIndex((broker) => {
            return broker.id === id;
        });
        this.brokersStocks.splice(index, 1);
        this.saveChangesToFile();
        return 0;
    }
    async update(id, updatedBroker) {
        const index = this.brokers.findIndex((broker) => {
            return broker.id === id;
        });
        updatedBroker.id = id;
        this.brokers[index] = updatedBroker;
        this.saveChangesToFile();
    }
    getLastId() {
        return this.brokers.length > 0
            ? this.brokers[this.brokers.length - 1].id
            : 0;
    }
    saveChangesToFile() {
        const brokersData = JSON.stringify(this.brokers);
        fs.writeFileSync(path.join(process.cwd(), './src/data/brokers.json'), brokersData);
        const brokersStocksData = JSON.stringify(this.brokersStocks);
        fs.writeFileSync(path.join(process.cwd(), './src/data/brokerStocks.json'), brokersStocksData);
    }
    async getBrokerCash(id) {
        const broker = await this.getOne(id);
        return broker.cash;
    }
    async setBrokerCash(id, newCash) {
        let broker = await this.getOne(id);
        broker.cash = newCash;
        this.saveChangesToFile();
    }
};
exports.BrokersService = BrokersService;
exports.BrokersService = BrokersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], BrokersService);
//# sourceMappingURL=brokers.service.js.map