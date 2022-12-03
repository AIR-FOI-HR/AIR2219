import { Entity, Column } from 'typeorm';
import { Currency } from '../constants/Currency';
import { CaptureMode } from '../constants/CaptureMode';
import { TemporalEntity } from './TemporalEntity';

@Entity()
export class AdminOptions extends TemporalEntity {
  @Column('varchar', { name: 'first_name', length: 45, nullable: false })
  contactEmail: string;

  @Column('varchar', { name: 'last_name', length: 45, nullable: false })
  contactPhone: string;

  @Column('varchar', { length: 20, nullable: false, unique: true })
  currency: Currency;

  @Column('varchar', { length: 45, nullable: false, unique: true })
  captureMode: CaptureMode;

  constructor(
    contactEmail: string,
    contactPhone: string,
    currency: Currency,
    captureMode: CaptureMode,
  ) {
    super();
    this.contactEmail = contactEmail,
    this.contactPhone = contactPhone,
    this.currency = currency,
    this.captureMode = captureMode
  }
}
