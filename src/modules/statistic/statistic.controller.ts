import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StatisticService } from './statistic.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Statistic')
@ApiBearerAuth()
@Controller('statistic')
export class StatisticController {
  constructor(private statisticService: StatisticService) {
  }
  
  @UseGuards(JwtAuthGuard)
  @Get(':countryId')
  async getStatistic(@Param('countryId') countryId: number){
      return await this.statisticService.getStatistic(countryId);
  }
}
