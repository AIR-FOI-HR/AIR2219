import { Entity, Column, ManyToOne } from 'typeorm';
import { City } from './City';
import { TemporalEntity } from './TemporalEntity';

@Entity()
export class Restroom extends TemporalEntity {
  @Column('varchar', {length: 45, nullable: false })
  name: string;

  @Column('varchar', {length: 25, nullable: false })
  tag: string;

  @Column({type: 'decimal', precision: 10, scale: 2, nullable: false})
  price: number;

  @Column('varchar', {length: 255, nullable: false})
  address: string;

  @Column({type: 'decimal', precision: 8, scale: 6, nullable: false})
  latitude: number;

  @Column({type: 'decimal', precision: 9, scale: 6, nullable: false})
  longitude: number;

  @ManyToOne(() => City, city => city.id) 
  city: City;

  constructor(
    name: string,
    tag: string,
    price: number,
    address: string,
    latitude: number,
    longitude: number,
    city: City
  ) {
    super();
    this.name = name,
    this.tag = tag,
    this.price = price,
    this.address = address,
    this.latitude = latitude,
    this.longitude = longitude,
    this.city = city
  }
}
