import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as cluster from "cluster";

export interface IStocksList {
  label: string;
  price: number;
  oldPrice: number;
}

export interface IRawBroker {
  name: string;
  cash: number;
}

export interface IBroker {
  id: number;
  name: string;
  cash: number;
  stocks?: IStocksList[];
}

export interface IUpdateBroker {
  id: number;
  name: string;
  cash: number;
}

export interface IBrokerName {
  username: string
}

export interface IBrokerID {
  id: number
}

export interface IStokeItem {
  id: number,
  count: number,
  price: number
}

export interface IBrokerStocks {
  id: number,
  stocks?: IStokeItem[]
}

@Injectable()
export class BrokersService {
  private brokers: IBroker[];
  private brokersStocks: IBrokerStocks[];
  constructor() {
    const brokersData: Buffer = fs.readFileSync(
      path.join(process.cwd(), './src/data/brokers.json'),
    );
    const brokersStocksData: Buffer = fs.readFileSync(
        path.join(process.cwd(), './src/data/brokerStocks.json'),
    );
    this.brokers = JSON.parse(String(brokersData));
    this.brokersStocks = JSON.parse(String(brokersStocksData));
  }
  async getAllBrokers() {
    return this.brokers;
  }
  async getOne(id: number) {
    return this.brokers.find((broker: IBroker) => {
      return broker.id === id;
    });
  }

  async getBrokerStocks(id: number){
    console.log(id);
    return this.brokersStocks.find((item: IBrokerStocks) => {
      return item.id === id;
    });
  }

  async signIn(username: string){
    return  this.brokers.find((broker: IBroker) => {
      return broker.name === username;
    })
  }

  async create(rawBroker: IRawBroker) {
    const newBroker: IBroker = {
      id: this.getLastId() + 1,
      name: rawBroker.name,
      cash: rawBroker.cash,
    };
    const newBrokerStocks: IBrokerStocks = {
      id: newBroker.id,
      stocks: []
    }
    for(let i = 1; i <= 8; i++){
      let item: IStokeItem = { id: i, count: 0, price: 0}
      newBrokerStocks.stocks.push(item);
    }
    this.brokers.push(newBroker);
    this.brokersStocks.push(newBrokerStocks);
    this.saveChangesToFile();
    return newBroker;
  }

  async removeBroker(id: number) {
    let index = this.brokers.findIndex((broker: IBroker) => {
      return broker.id === id;
    });
    this.brokers.splice(index, 1);

    index = this.brokersStocks.findIndex((broker: IBrokerStocks) => {
      return broker.id === id;
    });
    this.brokersStocks.splice(index, 1);
    this.saveChangesToFile();
    return 0;
  }

  async update(id: number, updatedBroker: IUpdateBroker) {
    const index = this.brokers.findIndex((broker: IBroker) => {
      return broker.id === id;
    });
    updatedBroker.id = id;
    this.brokers[index] = updatedBroker;
    this.saveChangesToFile();
  }

  private getLastId(): number {
    return this.brokers.length > 0
      ? this.brokers[this.brokers.length - 1].id
      : 0;
  }

  private saveChangesToFile() {
    const brokersData = JSON.stringify(this.brokers);
    fs.writeFileSync(
      path.join(process.cwd(), './src/data/brokers.json'),
      brokersData,
    );

    const brokersStocksData = JSON.stringify(this.brokersStocks);
    fs.writeFileSync(
        path.join(process.cwd(), './src/data/brokerStocks.json'),
        brokersStocksData,
    );
  }

  async getBrokerCash(id: number) {
    const broker = await this.getOne(id);
    return broker.cash;
  }

  async setBrokerCash(id: number, newCash: number) {
    let broker = await this.getOne(id);
    broker.cash = newCash;
    this.saveChangesToFile();
  }
}
