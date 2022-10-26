import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertData1661971213868 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const schemaName: string = process.env.DB_SCHEMA || 'eflush_app';

        await queryRunner.query(`set schema '${schemaName}';`);
        
        await queryRunner.query(`
            INSERT INTO "user" (created_at, updated_at, deleted_at, version, first_name, last_name, username, email, password, status) VALUES
            ( now(), now(), NULL, 1, 'Ivo', 'Ivic', 'iivic', 'iivic@mail.com', 'password', 'Active' ),
            ( now(), now(), NULL, 1, 'Marko', 'Markic', 'mmarkic', 'mmarkic@mail.com', 'password', 'Blocked' );
        `);
    }

    public async down(): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
