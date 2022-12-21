import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm';
import { ColumnNumericMarshaller } from './marshaller/columnNumeric.marshaller';
import { Restroom } from './Restroom';

@Entity()
export class City{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('varchar', { length: 45, nullable: false })
    name: string;

    @Column('varchar', { length: 10, nullable: false })
    code: string;

    @Column('decimal', { nullable: false, transformer: new ColumnNumericMarshaller() })
    latitude: number;

    @Column('decimal', { nullable: false, transformer: new ColumnNumericMarshaller() })
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
