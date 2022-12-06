import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany } from 'typeorm';
import { CaptureMode } from '../constants/CaptureMode';
import { OrderState } from '../constants/OrderState';
import { OrderType } from '../constants/OrderType';
import { Amount } from './Amount';
import { OrderError } from './OrderError';
import { Restroom } from './Restroom';
import { TemporalEntity } from './TemporalEntity';
import { User } from './User';

@Entity()
export class Order extends TemporalEntity{
    @Column('uuid', {name: "public_id" , nullable: false })
    publicId: number;

    @Column('varchar', { length: 20, nullable: false })
    type: OrderType;

    @Column('varchar', { length: 20, nullable: false })
    state: OrderState;

    @Column('varchar', {name: "capture_mode", length: 45, nullable: false })
    captureMode: CaptureMode;

    @Column('varchar', { name: "merchant_order_ext_ref", length: 255, nullable: false })
    merchantOrderExtRef: string;

    @Column('varchar', { name: 'email', length: 45, nullable: false, unique: true })
    email: string;

    @OneToOne(() => Amount)
    @JoinColumn() 
    amount: Amount;

    @Column('varchar', { name: "checkout_url", length: 255, nullable: false })
    checkoutUrl: string;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @ManyToOne(() => Restroom, (restroom) => restroom.orders)
    restroom: Restroom;

    @OneToMany(() => OrderError, (orderError) => orderError.order)
    errorToOrder: OrderError[]

    constructor(
        publicId: number,
        type: OrderType,
        state: OrderState,
        captureMode: CaptureMode,
        merchantOrderExtRef: string,
        email: string,
        amount: Amount,
        checkoutUrl: string,
        user: User,
        restroom: Restroom
    ) {
        super();
        this.publicId = publicId;
        this.type = type;
        this.state = state;
        this.captureMode = captureMode;
        this.merchantOrderExtRef = merchantOrderExtRef;
        this.email = email;
        this.amount = amount;
        this.checkoutUrl = checkoutUrl;
        this.user = user;
        this.restroom = restroom;
    }
}