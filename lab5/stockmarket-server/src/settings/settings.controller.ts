import { Body, Controller, Get, Header, Put } from '@nestjs/common';
import { ISettings, SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async get() {
    return this.settingsService.getSettings();
  }

  @Put()
  async update(@Body() settings: ISettings) {
    await this.settingsService.updateSettings(settings);
  }
}
