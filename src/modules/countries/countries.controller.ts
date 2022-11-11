import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
    constructor(private countriesService: CountriesService) {
      }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getCountries(){
        return await this.countriesService.getCountries();
    }
}
