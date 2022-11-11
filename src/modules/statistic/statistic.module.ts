import { Module } from '@nestjs/common';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';
import { ScheduleModule} from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Country } from 'src/entities/country.entity';
import { CountryRepository } from 'src/repositories/country.repository';
import { Statistic } from 'src/entities/statistic.entity';
import { StatisticRepository } from 'src/repositories/statistic.repository';

@Module({
  imports: [ ScheduleModule.forRoot(), TypeOrmModule.forFeature([ Country, Statistic ]), HttpModule ],
  controllers: [StatisticController],
  providers: [StatisticService, CountryRepository, StatisticRepository]
})
export class StatisticModule {}
