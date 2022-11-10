import { Controller, Get } from '@nestjs/common';

@Controller('countries')
export class CountriesController {
    @Get()
    getCountries(){
        return {test:'test'}
    }
}
