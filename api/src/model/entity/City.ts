import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity()
export class City{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('varchar', { length: 45, nullable: false })
    name: string;

    @Column('varchar', { length: 10, nullable: false })
    code: string;

    constructor(
        name: string,
        code: string,
    ) {
        this.name = name;
        this.code = code;
    }
}
