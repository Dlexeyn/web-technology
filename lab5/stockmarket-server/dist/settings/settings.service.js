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
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let SettingsService = class SettingsService {
    constructor() {
        const settingsData = fs.readFileSync(path.join(process.cwd(), './src/data/settings.json'));
        this.settings = JSON.parse(String(settingsData));
        console.log('Init settings');
        console.log(this.settings);
    }
    saveChangesToFile() {
        const settingsData = JSON.stringify(this.settings);
        fs.writeFileSync(path.join(process.cwd(), './src/data/settings.json'), settingsData);
    }
    getSettings() {
        return this.settings;
    }
    async updateSettings(newSettings) {
        this.settings = {
            startDate: newSettings.startDate,
            dateChangeSpeed: newSettings.dateChangeSpeed,
            usedStocks: newSettings.usedStocks,
            isStarted: newSettings.isStarted,
            currentDate: newSettings.currentDate,
        };
    }
    async setCurrentDate(newDate) {
        this.settings.currentDate = newDate;
    }
    async setStatus(newStatus) {
        this.settings.isStarted = newStatus;
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SettingsService);
//# sourceMappingURL=settings.service.js.map