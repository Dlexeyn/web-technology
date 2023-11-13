import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import {BrokersService, IBrokerID, IBrokerName, IRawBroker, IUpdateBroker} from './brokers.service';


@Controller('brokers')
export class BrokersController {
  constructor(private readonly brokersService: BrokersService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async getAll() {
    return await this.brokersService.getAllBrokers();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  async getOne(@Param('id') id: string) {
    return await this.brokersService.getOne(parseInt(id));
  }

  @Get('/stocks/:id')
  @Header('Content-Type', 'application/json')
  async getAllForBroker(@Param('id') id: string) {
    console.log(id);
    console.log('brokers/stocks')
    return await this.brokersService.getBrokerStocks(parseInt(id));
  }

  @Put(':id')
  async update(@Body() broker: IUpdateBroker, @Param('id') id: string) {
    return this.brokersService.update(parseInt(id), broker);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.brokersService.removeBroker(parseInt(id));
  }

  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  async login(@Body() data: IBrokerName){
    return await this.brokersService.signIn(data.username);
  }

  @Get('/cash/:id')
  @Header('Content-Type', 'application/json')
  async getCash(@Param('id') id: string) {
    // console.log(id);
    // console.log('brokers/stocks')
    return await this.brokersService.getBrokerCash(parseInt(id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  async create(@Body() broker: IRawBroker) {
    return await this.brokersService.create(broker);
  }
}
