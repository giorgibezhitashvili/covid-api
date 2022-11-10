import { Injectable } from "@nestjs/common";
import { Country } from "src/entities/country.entity";
import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";

@Injectable()
export class CountryRepository  extends BaseRepository<Country> {
  constructor(private dataSource: DataSource)
  {
      super(Country, dataSource.createEntityManager());
  }

  async insertCountries(countries: Country[]){
    return await this.createQueryBuilder()
    .insert()
    .into(Country)
    .values(countries)
    .execute();
  }

} 
