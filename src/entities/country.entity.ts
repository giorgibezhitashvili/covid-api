import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, JoinColumn } from 'typeorm';
import { Statistic } from './statistic.entity';

@Entity('countries', { synchronize: true })
export class Country  extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column({ type: 'json', nullable: true})
    name: { en: string, ka: string };

    @OneToMany(() => Statistic, statistics => statistics.country )
    @JoinColumn({name: 'id'})
    statistics: Statistic[]
}