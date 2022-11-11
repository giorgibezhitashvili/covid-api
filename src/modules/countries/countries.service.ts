import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import fetch from "node-fetch";
import { map } from 'rxjs';
import { Country } from 'src/entities/country.entity';
import { CountryRepository } from 'src/repositories/country.repository';
@Injectable()
export class CountriesService {
    private countriesApiUrl = 'https://devtest.ge/countries';
    constructor(
        private readonly httpService: HttpService,
        private countryRepository: CountryRepository
        ) {}

    async syncCountries(){
        const response = await this.getCountriesFromApi();
        const countriesData: Country[] = response.data.map((item) => {
            const country = new Country;
            country.code = item.code;
            country.name = { en: item.name.en, ka: item.name.ka };
            return country;
        });
        const result = await this.countryRepository.insertCountries(countriesData);
        console.log('affectedRows', result.raw.affectedRows);
    }

    async getCountriesFromApi(){
        try{
            return await this.httpService.get(this.countriesApiUrl).toPromise();
        }catch (error) { 
            throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Fetch countries failed',
          }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getCountries(){
        return await this.countryRepository.getCountries();
    }
}
