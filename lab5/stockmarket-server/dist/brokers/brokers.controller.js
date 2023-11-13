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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrokersController = void 0;
const common_1 = require("@nestjs/common");
const brokers_service_1 = require("./brokers.service");
let BrokersController = class BrokersController {
    constructor(brokersService) {
        this.brokersService = brokersService;
    }
    async getAll() {
        return await this.brokersService.getAllBrokers();
    }
    async getOne(id) {
        return await this.brokersService.getOne(parseInt(id));
    }
    async getAllForBroker(id) {
        console.log(id);
        console.log('brokers/stocks');
        return await this.brokersService.getBrokerStocks(parseInt(id));
    }
    async update(broker, id) {
        return this.brokersService.update(parseInt(id), broker);
    }
    async remove(id) {
        return await this.brokersService.removeBroker(parseInt(id));
    }
    async login(data) {
        return await this.brokersService.signIn(data.username);
    }
    async getCash(id) {
        return await this.brokersService.getBrokerCash(parseInt(id));
    }
    async create(broker) {
        return await this.brokersService.create(broker);
    }
};
exports.BrokersController = BrokersController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BrokersController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BrokersController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)('/stocks/:id'),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BrokersController.prototype, "getAllForBroker", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BrokersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BrokersController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BrokersController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('/cash/:id'),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BrokersController.prototype, "getCash", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Header)('Cache-Control', 'none'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BrokersController.prototype, "create", null);
exports.BrokersController = BrokersController = __decorate([
    (0, common_1.Controller)('brokers'),
    __metadata("design:paramtypes", [brokers_service_1.BrokersService])
], BrokersController);
//# sourceMappingURL=brokers.controller.js.map