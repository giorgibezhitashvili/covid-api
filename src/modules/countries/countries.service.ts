import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
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
        return await this.httpService.get(this.countriesApiUrl).toPromise();
    }

}
