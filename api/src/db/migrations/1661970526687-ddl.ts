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
                "id" serial NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT now(),
                "updated_at" timestamp NOT NULL DEFAULT now(),
                "deleted_at" timestamp,
                "version" int NOT NULL,
                "first_name" varchar(45) NOT NULL,
                "last_name" varchar(45) NOT NULL,
                "username" varchar(45) NOT NULL,
                "email" varchar(45) NOT NULL,
                "password" varchar NOT NULL,
                "status" varchar(20) NOT NULL,
                PRIMARY KEY ("id"),
                CONSTRAINT "username_unique" UNIQUE (username),
                CONSTRAINT "email_unique" UNIQUE (email)
            );
            DROP TABLE IF EXISTS "admin_options";
            CREATE TABLE "admin_options" (
                "id" serial NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT now(),
                "updated_at" timestamp NOT NULL DEFAULT now(),
                "deleted_at" timestamp,
                "version" int NOT NULL,
                "contact_email" varchar(45) NOT NULL,
                "contact_phone" varchar(45) NOT NULL,
                "currency" varchar(20) NOT NULL,
                "capture_mode" varchar(45) NOT NULL,
                PRIMARY KEY ("id")
            );
            `
        );
    }

    down(): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
