import { Entity, Column } from 'typeorm';
import { Currency } from '../constants/Currency';
import { CaptureMode } from '../constants/CaptureMode';
import { TemporalEntity } from './TemporalEntity';

@Entity()
export class AdminOptions extends TemporalEntity {
  @Column('varchar', { name: 'contact_email', length: 45, nullable: false })
  contactEmail: string;

  @Column('varchar', { name: 'contact_phone', length: 45, nullable: false })
  contactPhone: string;

  @Column('varchar', { length: 20, nullable: false })
  currency: Currency;

  @Column('varchar', { name: 'capture_mode', length: 45, nullable: false })
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
