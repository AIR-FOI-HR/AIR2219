import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';
import { Currency } from '../constants/Currency';

@Entity()
export class Amount{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: 'decimal', precision: 10, scale: 2, nullable: false })
    value: number;

    @Column('varchar', { length: 20, nullable: false })
    currency: Currency;

    @Column('timestamp', { name: "order_created_at", nullable: false })
    orderCreatedAt: string;

    @Column('varchar', { name: "user_email", length: 45, nullable: false })
    userEmail: string;

    constructor(
        value: number,
        currency: Currency,
        orderCreatedAt: string,
        userEmail: string
    ) {
        this.value = value;
        this.currency = currency;
        this.orderCreatedAt = orderCreatedAt;
        this.userEmail = userEmail;
    }
}