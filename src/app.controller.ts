import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SearchService } from './services/search.service';
import { SearchBody } from './types/product';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly searchService: SearchService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('startSearch')
  startSearch(@Body() body: SearchBody) {
    this.searchService.start(body.query);
  }
}
