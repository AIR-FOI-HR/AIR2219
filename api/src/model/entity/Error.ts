import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity()
export class Error{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('number', { name: 'status_code', nullable: false})
    statusCode: number;

    @Column('varchar', { name: 'description', length: 255, nullable: false })
    description: string;

    constructor(
        statusCode: number,
        description: string,
    ) {
        this.statusCode = statusCode;
        this.description = description;
    }
}
