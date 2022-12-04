import { MigrationInterface, QueryRunner } from 'typeorm';

export class ddl1661970526687 implements MigrationInterface {
    name?: string | undefined;

    public async up(queryRunner: QueryRunner): Promise<void> {
        const schemaName: string = process.env.DB_SCHEMA || 'eflush_app';

        await queryRunner.query(`set schema '${schemaName}';`);
        
        await queryRunner.query(
            `
            DROP TABLE IF EXISTS "user" CASCADE;
            CREATE TABLE "user" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT now(),
                "updated_at" timestamp NOT NULL DEFAULT now(),
                "deleted_at" timestamp NULL,
                "version" int4 NOT NULL,
                "first_name" varchar(45) NOT NULL,
                "last_name" varchar(45) NOT NULL,
                "email" varchar(45) NOT NULL,
                "phone" varchar(15) NOT NULL,
                "password" varchar NOT NULL,
                "role" varchar(20) NOT NULL,
                "status" varchar(20) NOT NULL,
                "password_reset_code" varchar NULL,
                CONSTRAINT "email_unique" UNIQUE (email)
            );

            DROP TABLE IF EXISTS "error" CASCADE;
            CREATE TABLE "error" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
                "status_code" int4 NOT NULL,
                "description" varchar NOT NULL 
            );
            `
        );
    }

    down(): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
