import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesModule } from './modules/countries/countries.module';
import { AuthModule } from './modules/auth/auth.module';
import 'dotenv/config';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 3600),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}', 'src/**/*.entity.ts'],
      synchronize: true,
      logging: false,
      extra: {
        charset: 'utf8mb4_general_ci',
      },
    }),
    CountriesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
