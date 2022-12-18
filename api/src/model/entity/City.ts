import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm';
import { Restroom } from './Restroom';

@Entity()
export class City{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('varchar', { length: 45, nullable: false })
    name: string;

    @Column('varchar', { length: 10, nullable: false })
    code: string;

    @Column('float', { nullable: false })
    latitude: number;

    @Column('float', { nullable: false })
    longitude: number;

    @OneToMany(() => Restroom, (restroom) => restroom.city)
    restrooms: Restroom[];

    constructor(
        name: string,
        code: string,
        latitude: number,
        longitude: number,
    ) {
        this.name = name;
        this.code = code;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
