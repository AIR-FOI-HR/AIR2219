import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';
import { Currency } from '../constants/Currency';
import { ColumnNumericMarshaller } from './marshaller/columnNumeric.marshaller';

@Entity()
export class Amount{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: 'decimal', precision: 10, scale: 2, nullable: false, transformer: new ColumnNumericMarshaller() })
    value: number;

    @Column('varchar', { length: 20, nullable: false })
    currency: Currency;

    @Column('timestamp', { nullable: false })
    orderCreatedAt: string;

    @Column('varchar', { length: 45, nullable: false })
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