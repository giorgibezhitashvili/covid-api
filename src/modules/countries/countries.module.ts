import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/entities/country.entity';
import { CountryRepository } from 'src/repositories/country.repository';
import { CountriesSyncCommand } from './commands/countriesSync.command';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';

@Module({
  imports:[ TypeOrmModule.forFeature([ Country ]), HttpModule],
  controllers: [CountriesController],
  providers: [CountriesService, CountriesSyncCommand, CountryRepository]
})
export class CountriesModule {}