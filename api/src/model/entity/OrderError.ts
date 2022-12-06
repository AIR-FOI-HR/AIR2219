import { PrimaryGeneratedColumn, Entity, Column, ManyToOne } from 'typeorm';
import { Error } from './Error';
import { Order } from './Order';

@Entity()
export class OrderError{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Order, (order) => order.errorToOrder)
    order: Order

    @ManyToOne(() => Error, (error) => error.errorToOrder)
    error: Error

    @Column('int', { nullable: false })
    timestamp: number;

    constructor(
        order: Order,
        error: Error,
        timestamp: number
    ) {
        this.order = order;
        this.error = error;
        this.timestamp = timestamp;
    }
}