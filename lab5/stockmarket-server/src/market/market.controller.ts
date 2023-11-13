import {Body, Controller, Header, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {IBuyData, MarketService} from "./market.service";
import {IBrokerName} from "../brokers/brokers.service";

@Controller('market')
export class MarketController {
    constructor(private marketService: MarketService) {}

    @Post('buy')
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-Type', 'application/json')
    async buy(@Body() data: IBuyData){
        console.log("Buy");
        console.log(data);
        return await this.marketService.buy(data);
    }

    @Post('sell')
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-Type', 'application/json')
    async sell(@Body() data: IBuyData){
        console.log("Sell");
        return await this.marketService.sell(data);
    }
}
