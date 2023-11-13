import { Injectable } from '@nestjs/common';
import { ISettings, SettingsService } from '../settings/settings.service';
import { IStocks, IStocksHistory, StocksService } from "../stocks/stocks.service";
import {BrokersService, IStokeItem} from "../brokers/brokers.service";

export interface IBuyData {
  brokerId: number,
  stockId: number,
  price: number,
  count: number
}

@Injectable()
export class MarketService {
  private selectedIds: number[];
  private stocksHistory: IStocksHistory[];
  constructor(
    private settingsService: SettingsService,
    private stocksService: StocksService,
    private brokerService: BrokersService
  ) {}

  async startTrading() {
    const { startDate, usedStocks } = this.settingsService.getSettings();
    // console.log(usedStocks);
    this.selectedIds = MarketService.getSelectedIds(usedStocks);
    // console.log('IDs:');
    // console.log(this.selectedIds);
    this.stocksHistory = await this.stocksService.getStocksHistory();
    const historyIndex = this.findHistoryIndex(new Date(startDate));
    const updatedStocks = await this.updateWithNewPrice(historyIndex);
    return { updatedStocks, historyIndex };
  }

  private static getSelectedIds(usedStocks: IStocks[]) {
    const ids = [];
    for (const stock of usedStocks) {
      ids.push(stock.id);
    }
    return ids;
  }

  private findHistoryIndex(startDate: Date) {
    let currentDate: Date;
    for (const [index, stock] of this.stocksHistory[1].stocks.entries()) {
      currentDate = new Date(stock.date);
      if (currentDate <= startDate) {
        return index;
      }
    }
    return this.stocksHistory[1].stocks.length - 1;
  }

  public async updateWithNewPrice(historyIndex: number) {
    const stocks: IStocks[] = await this.stocksService.getAllStocks();
    // console.log('stocks')
    // console.log(stocks)
    const selectedStocks = stocks.filter((stock) =>
      this.selectedIds.includes(stock.id),
    );
    // console.log('selectedStocks')
    // console.log(selectedStocks)
    const updatedStocks: IStocks[] = selectedStocks.map((stock) => {
      const data = this.stocksHistory.find(
        (item) => item.id === stock.id,
      ).stocks;
      return {
        id: stock.id,
        label: stock.label,
        name: stock.name,
        price: parseFloat(data[historyIndex].open),
      };
    });
    return JSON.parse(JSON.stringify(updatedStocks));
  }

  async buy(data: IBuyData){
    console.log(data);
    let brokerCash = await this.brokerService.getBrokerCash(data.brokerId);
    let updatedBrokerCash = brokerCash - data.count * data.price;

    if(updatedBrokerCash >= 0){
      let brokerStocks = await this.brokerService.getBrokerStocks(data.brokerId);
      console.log(brokerStocks);
      let buyingStock = brokerStocks.stocks.find((item: IStokeItem) => {
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

  async sell(data: IBuyData){
    console.log(data);
    let brokerStocks = await this.brokerService.getBrokerStocks(data.brokerId);
    console.log(brokerStocks);
    let sellingStock = brokerStocks.stocks.find((item: IStokeItem) => {
      return item.id === data.stockId;
    });

    if(sellingStock.count >= data.count){
      let copySellingStock = JSON.parse(JSON.stringify(sellingStock));
      sellingStock.count -= data.count;
      copySellingStock.count = data.count;
      let brokerCash = await this.brokerService.getBrokerCash(data.brokerId);
      await this.brokerService.setBrokerCash(data.brokerId, brokerCash + data.count * data.price);
      return copySellingStock;
    }
    return { error: 'Incorrect count!' };
  }
}
