import { Injectable } from "@nestjs/common";
import { Country } from "src/entities/country.entity";
import { Statistic } from "src/entities/statistic.entity";
import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";

@Injectable()
export class StatisticRepository  extends BaseRepository<Statistic> {
  constructor(private dataSource: DataSource)
  {
      super(Statistic, dataSource.createEntityManager());
  }

  async saveStatistic(data, country: Country){
    const {confirmed, recovered, deaths } = data;
    const statistic = new Statistic;
    statistic.country = country;
    statistic.recovered = recovered;
    statistic.deaths = deaths;
    statistic.confirmed = confirmed;
    return await this.save(statistic);
  }

  async getStatisticByCountry(countryId:number){
    return await this.createQueryBuilder('s').where('country_id = :countryId', {countryId}).orderBy('created_at', 'DESC').getOne();
  }


} 
