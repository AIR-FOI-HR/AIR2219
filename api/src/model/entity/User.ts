import { Entity, Column, OneToMany } from 'typeorm';
import { UserStatus } from '../constants/UserStatus';
import { UserRole } from '../constants/UserRole';
import { TemporalEntity } from './TemporalEntity';
import { Order } from './Order';

@Entity()
export class User extends TemporalEntity {
  @Column('varchar', { length: 45, nullable: false })
  firstName: string;

  @Column('varchar', { length: 45, nullable: false })
  lastName: string;

  @Column('varchar', { length: 45, nullable: false, unique: true })
  email: string;

  @Column('varchar', { length: 15, nullable: false})
  phone: string;

  @Column('varchar', { nullable: false }) // Defaults to 255 characters
  password: string;

  @Column('varchar', { length: 20, nullable: false})
  role: UserRole;

  @Column('varchar', { length: 20, nullable: false })
  status: UserStatus;

  @Column('varchar', { nullable: false})
  passwordResetCode: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.status = UserStatus.ACTIVE;
    this.role = UserRole.USER;
  }
}
