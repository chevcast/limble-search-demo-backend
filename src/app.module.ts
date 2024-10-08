import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchService } from './services/search.service';
import { SearchGateway } from './gateways/search.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SearchService, SearchGateway],
})
export class AppModule {}
