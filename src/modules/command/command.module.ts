import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesModule } from '../countries/countries.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT, 3600),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          entities: ['dist/**/*.entity{.ts,.js}', 'src/**/*.entity{.ts,.js}'],
          synchronize: true,
          logging: false,
          extra: {
            charset: 'utf8mb4_general_ci',
          },
        }),
        CountriesModule
    ]
})
export class CommandModule {}
