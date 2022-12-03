import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertData1661971213868 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const schemaName: string = process.env.DB_SCHEMA || 'eflush_app';

        await queryRunner.query(`set schema '${schemaName}';`);
        
        await queryRunner.query(`
            INSERT INTO "user" (created_at, updated_at, deleted_at, version, first_name, last_name, email, phone, password, role, status) VALUES
            ( now(), now(), NULL, 1, 'admin', 'admic', 'admin@mail.com', '091 111 1111', 'admin', 'ADMIN', 'ACTIVE' ),
            ( now(), now(), NULL, 1, 'obican', 'obicanko', 'obican@mail.com', '091 111 1111', 'obican', 'USER', 'ACTIVE' ),
            ( now(), now(), NULL, 1, 'blokiran', 'blokiranko', 'blokiran@mail.com', '091 111 1111', 'blokiran', 'USER', 'BANNED' ),
            ( now(), now(), NULL, 1, 'pending', 'pendingko', 'pending@mail.com', '091 111 1111', 'pending', 'USER', 'PENDING' ),
            ( now(), now(), NULL, 1, 'Mimi', 'Reba', 'mimi@mail.com', '091 111 1111', 'mimi', 'USER', 'ACTIVE' );
        `);
    }

    public async down(): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
