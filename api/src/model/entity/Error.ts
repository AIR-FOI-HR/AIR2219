import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm';
import { OrderError } from './OrderError';

@Entity()
export class Error{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('int', { name: 'status_code', nullable: false})
    statusCode: number;

    @Column('varchar', { name: 'description', length: 255, nullable: false })
    description: string;

    @OneToMany(() => OrderError, (orderError) => orderError.error)
    errorToOrder: OrderError[]

    constructor(
        statusCode: number,
        description: string,
    ) {
        this.statusCode = statusCode;
        this.description = description;
    }
}
