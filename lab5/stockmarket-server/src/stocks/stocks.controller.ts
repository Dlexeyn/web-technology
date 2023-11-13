import { Controller, Get, Header, Param } from "@nestjs/common";
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private stocksService: StocksService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async getAll() {
    return await this.stocksService.getAllStocks();
  }

  @Get('/:id')
  @Header('Content-Type', 'application/json')
  async getAllForBroker(@Param('id') id: string) {
    return await this.stocksService.getBrokerStocks(parseInt(id));
  }

  @Get('history/:id')
  @Header('Content-Type', 'application/json')
  async getHistory(@Param('id') id: string) {
    return await this.stocksService.getStockHistory(parseInt(id));
  }
}
