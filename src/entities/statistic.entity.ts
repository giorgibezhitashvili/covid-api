import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Country } from './country.entity';

@Entity('statistic', { synchronize: true })
export class Statistic  extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'country_id', type: 'int'})
    countryId: number;
    
    @Column({name: 'confirmed', type: 'int'})
    confirmed: number;
    
    @Column({name: 'recovered', type: 'int'})
    recovered: number;

    @Column({name: 'deaths', type: 'int'})
    deaths: number;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Country, country => country.statistics)
    @JoinColumn({name: 'country_id'})
    country: Country;
}
/*
{
    "id": 29,
    "country": "Georgia",
    "code": "GE",
    "confirmed": 2971,
    "recovered": 4582,
    "critical": 1032,
    "deaths": 433,
    "created_at": "2022-02-13T18:17:01.000000Z",
    "updated_at": "2022-11-10T00:00:03.000000Z"
  }
  */