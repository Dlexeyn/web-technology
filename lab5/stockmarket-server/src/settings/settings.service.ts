import { Injectable } from '@nestjs/common';
import { IStocks } from '../stocks/stocks.service';
import * as fs from 'fs';
import * as path from 'path';

export interface ISettings {
  startDate: string;
  dateChangeSpeed: number;
  usedStocks: IStocks[];
  isStarted: boolean;
  currentDate: string;
}

@Injectable()
export class SettingsService {
  private settings: ISettings;

  constructor() {
    const settingsData: Buffer = fs.readFileSync(
      path.join(process.cwd(), './src/data/settings.json'),
    );
    this.settings = JSON.parse(String(settingsData));
    console.log('Init settings');
    console.log(this.settings)
  }

  private saveChangesToFile() {
    const settingsData = JSON.stringify(this.settings);
    fs.writeFileSync(
      path.join(process.cwd(), './src/data/settings.json'),
      settingsData,
    );
  }

  getSettings() {
    return this.settings;
  }

  async updateSettings(newSettings: ISettings) {
    // console.log('Update settings');
    // console.log(newSettings);
    this.settings = {
      startDate: newSettings.startDate,
      dateChangeSpeed: newSettings.dateChangeSpeed,
      usedStocks: newSettings.usedStocks,
      isStarted: newSettings.isStarted,
      currentDate: newSettings.currentDate,
    };
    // console.log(this.settings);
  }

  async setCurrentDate(newDate: string) {
    this.settings.currentDate = newDate;
  }

  async setStatus(newStatus: boolean){
    this.settings.isStarted = newStatus;
  }
}
