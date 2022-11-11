import { Controller, Get, Param } from '@nestjs/common';
import { StatisticService } from './statistic.service';

@Controller('statistic')
export class StatisticController {
    constructor(private statisticService: StatisticService) {
    }
  @Get(':countryId')
  async getStatistic(@Param('countryId') countryId: number){
      return await this.statisticService.getStatistic(countryId);
  }
}
