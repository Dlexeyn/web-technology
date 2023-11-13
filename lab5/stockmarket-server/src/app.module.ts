import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrokersController } from './brokers/brokers.controller';
import { BrokersService } from './brokers/brokers.service';
import { StocksService } from './stocks/stocks.service';
import { StocksController } from './stocks/stocks.controller';
import { SettingsController } from './settings/settings.controller';
import { SettingsService } from './settings/settings.service';
import { MarketService } from './market/market.service';
import { WebsocketService } from './market/websocket/websocket.service';
import { MarketController } from './market/market.controller';

@Module({
  imports: [],
  controllers: [AppController, BrokersController, StocksController, SettingsController, MarketController],
  providers: [AppService, BrokersService, StocksService, SettingsService, MarketService, WebsocketService],
})
export class AppModule {}
