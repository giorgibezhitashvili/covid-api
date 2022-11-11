import { Controller, Get } from '@nestjs/common';
import { StatisticService } from './statistic.service';

@Controller('statistic')
export class StatisticController {
    constructor(private statisticService: StatisticService) {
    }
  @Get()
  async testStatistic(){
      return await this.statisticService.runSyncStatistic();
  }
}
