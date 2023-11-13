import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import {BrokersService, IBrokerStocks, IStokeItem} from "../brokers/brokers.service";

export interface IStocks {
  id: number;
  label: string;
  name: string;
  price: number;
}

interface IStockData {
  date: string;
  open: string;
}

export interface IStocksHistory {
  id: number;
  label: string;
  stocks: IStockData[];
}
@Injectable()
export class StocksService {
  private stocks: IStocks[];
  private stocksHistory: IStocksHistory[];
  constructor(private brokerService: BrokersService) {
    const stocksData: Buffer = fs.readFileSync(
      path.join(process.cwd(), './src/data/stocks.json'),
    );
    this.stocks = JSON.parse(String(stocksData));

    const stocksHistoryData: Buffer = fs.readFileSync(
      path.join(process.cwd(), './src/data/stocksHistory.json'),
    );
    this.stocksHistory = JSON.parse(String(stocksHistoryData));
  }

  async getAllStocks() {
    return this.stocks;
  }

  async getAllForBroker(id: number) {
    let copyStocks = JSON.parse(JSON.stringify(this.stocks));
    const brokerStocks = await this.brokerService.getBrokerStocks(id);
    console.log(id);
    console.log(brokerStocks)

    for(let item of copyStocks){
      let stock = brokerStocks.stocks.find((bstock: IStokeItem) => {
        return bstock.id === item.id;
      })
      item.count = stock.count;
    }
    // console.log(stocks);
    console.log(copyStocks);
    return copyStocks;
  }

  async getBrokerStocks(id: number){
    return this.stocksHistory.find((history: IStocksHistory) => {
      return history.id === id;
    });
  }

  async getStocksHistory() {
    return this.stocksHistory;
  }

  async getStockHistory(id: number) {
    return this.stocksHistory.find((history: IStocksHistory) => {
      return history.id === id;
    });
  }

  private saveChangesToFile() {
    const brokersData = JSON.stringify(this.stocks);
    fs.writeFileSync(
      path.join(process.cwd(), '\\src\\data\\stocks.json'),
      brokersData,
    );
  }
}
