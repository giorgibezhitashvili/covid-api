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

  async getCountryWithoutStatistic(){
    const qb  = this.createQueryBuilder('c');
    qb.where('id NOT IN ' + qb.subQuery()
      .select('s.country_id')
      .from('statistic', 's')
      .where('created_at >= date(now())')
      .getQuery()
    );

    return await qb.getOne();
  }

} 
