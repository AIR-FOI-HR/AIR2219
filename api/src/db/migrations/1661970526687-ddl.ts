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

            DROP TABLE IF EXISTS "admin_options" CASCADE;
            CREATE TABLE "admin_options" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT now(),
                "updated_at" timestamp NOT NULL DEFAULT now(),
                "deleted_at" timestamp,
                "version" int NOT NULL,
                "contact_email" varchar(45) NOT NULL,
                "contact_phone" varchar(45) NOT NULL,
                "currency" varchar(20) NOT NULL,
                "capture_mode" varchar(45) NOT NULL
            );

            DROP TABLE IF EXISTS "error" CASCADE;
            CREATE TABLE "error" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
                "status_code" int NOT NULL,
                "description" varchar NOT NULL 
            );

            DROP TABLE IF EXISTS "city" CASCADE;
            CREATE TABLE "city" (
            "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
            "name" varchar(45) NOT NULL,
            "code" varchar(10) NOT NULL
            );

            DROP TABLE IF EXISTS "restroom" CASCADE;
            CREATE TABLE "restroom" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT now(),
                "updated_at" timestamp NOT NULL DEFAULT now(),
                "deleted_at" timestamp NULL,
                "version" int4 NOT NULL,
                "name" varchar(45) NOT NULL,
                "tag" varchar(25) NOT NULL,
                "price" decimal(10,2) NOT NULL,
                "address" varchar(255) NOT NULL,
                "latitude" decimal(8,6) NOT NULL,
                "longitude" decimal(9,6) NOT NULL,
                "city_id" uuid NOT NULL,
                CONSTRAINT "city_fk"
                FOREIGN KEY("city_id") 
                REFERENCES city(id)
            );

            DROP TABLE IF EXISTS "amount" CASCADE;
            CREATE TABLE "amount" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
                "value" decimal(10,2) NOT NULL,
                "currency" varchar(20) NOT NULL,
                "order_created_at" timestamp NOT NULL,
                "user_email" varchar(45) NOT NULL
            );

            DROP TABLE IF EXISTS "order" CASCADE;
            CREATE TABLE "order" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
                "public_id" uuid NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT now(),
                "updated_at" timestamp NOT NULL DEFAULT now(),
                "deleted_at" timestamp NULL,
                "version" int4 NOT NULL,
                "type" varchar(20) NOT NULL,
                "state" varchar(20) NOT NULL,
                "capture_mode" varchar(45) NOT NULL,
                "merchant_order_ext_ref" varchar(255) NOT NULL,
                "email" varchar(45) NOT NULL,
                "amount_id" uuid NOT NULL,
                "checkout_url" varchar(255) NOT NULL,
                "user_id" uuid NOT NULL,
                "restroom_id" uuid NOT NULL,
                CONSTRAINT "FK_OrderAmount"
                FOREIGN KEY("amount_id") REFERENCES amount(id),
                CONSTRAINT "FK_OrderUser"
                FOREIGN KEY("user_id") REFERENCES "user"(id),
                CONSTRAINT "FK_OrderRestroom"
                FOREIGN KEY("restroom_id") REFERENCES restroom(id)
            );     

            DROP TABLE IF EXISTS "order_error" CASCADE;
            CREATE TABLE "order_error" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
                "order_id" uuid NOT NULL,
                "error_id" uuid NOT NULL,
                "timestamp" int NOT NULL,
                CONSTRAINT "FK_Order_errorError"
                FOREIGN KEY("error_id") REFERENCES error(id), 
                CONSTRAINT "FK_Order_errorOrder"
                FOREIGN KEY("order_id") REFERENCES "order"(id) 
            );
            `
        );
    }

    down(): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
