import { Command, CommandRunner, Option } from 'nest-commander';
import { CountriesService } from '../countries.service';

@Command({ name: 'countries-sync', description: 'Sync countries from api' })
export class CountriesSyncCommand extends CommandRunner {
  constructor(private countriesService: CountriesService) {
    super()
  }

  async run(): Promise<void> {
    await this.countriesService.syncCountries();
  }

}