import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  DeleteDateColumn,
} from 'typeorm';

export abstract class TemporalEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @VersionColumn()
  version: number;
}
