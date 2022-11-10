import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('countries', { synchronize: true })
export class Country  extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column({ type: 'json', nullable: true})
    name: { en: string, ka: string };

}