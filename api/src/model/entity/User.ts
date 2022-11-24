import { Entity, Column } from 'typeorm';
import { UserStatus } from '../constants/UserStatus';
import { TemporalEntity } from './TemporalEntity';

@Entity()
export class User extends TemporalEntity {
  @Column('varchar', { name: 'first_name', length: 45, nullable: false })
  firstName: string;

  @Column('varchar', { name: 'last_name', length: 45, nullable: false })
  lastName: string;

  @Column('varchar', { length: 45, nullable: false, unique: true })
  username: string;

  @Column('varchar', { length: 45, nullable: false, unique: true })
  email: string;

  @Column('varchar', { nullable: false }) // Defaults to 255 characters
  password: string;

  @Column('varchar', { length: 20, nullable: false })
  status: UserStatus;

  constructor(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.status = UserStatus.ACTIVE;
  }
}
