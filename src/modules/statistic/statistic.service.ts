import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';
import { CountryRepository } from 'src/repositories/country.repository';
import { StatisticRepository } from 'src/repositories/statistic.repository';

@Injectable()
export class StatisticService {
    private statisticApiUrl = 'https://devtest.ge/get-country-statistics';
    constructor(
        private readonly httpService: HttpService,
        private countryRepository: CountryRepository,
        private statisticRepository: StatisticRepository
        ) {}

    @Cron(CronExpression.EVERY_HOUR)
    async runSyncStatistic(){
        const country = await this.countryRepository.getCountryWithoutStatistic();
        if(!country){
            return false;
        }
        const response = await this.getStatisticFromApi(country.code);
        await this.statisticRepository.saveStatistic(response.data, country);
    }

    async getStatisticFromApi(code: string){
        try{
            return await this.httpService.post(this.statisticApiUrl, {code}).toPromise();
        }catch (error) { 
            throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Fetch statistic failed',
          }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getStatistic(countryId:number){
        return await this.statisticRepository.getStatisticByCountry(countryId);
    }
}
