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
                "createdAt" timestamp NOT NULL DEFAULT now(),
                "updatedAt" timestamp NOT NULL DEFAULT now(),
                "deletedAt" timestamp NULL,
                "version" int4 NOT NULL,
                "firstName" varchar(45) NOT NULL,
                "lastName" varchar(45) NOT NULL,
                "email" varchar(45) NOT NULL,
                "phone" varchar(15) NOT NULL,
                "password" varchar NOT NULL,
                "role" varchar(20) NOT NULL,
                "status" varchar(20) NOT NULL,
                "passwordResetCode" varchar NULL,
                CONSTRAINT "emailUnique" UNIQUE (email)
            );

            DROP TABLE IF EXISTS "admin_options" CASCADE;
            CREATE TABLE "admin_options" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
                "createdAt" timestamp NOT NULL DEFAULT now(),
                "updatedAt" timestamp NOT NULL DEFAULT now(),
                "deletedAt" timestamp,
                "version" int NOT NULL,
                "contactEmail" varchar(45) NOT NULL,
                "contactPhone" varchar(45) NOT NULL,
                "currency" varchar(20) NOT NULL,
                "captureMode" varchar(45) NOT NULL
            );

            DROP TABLE IF EXISTS "error" CASCADE;
            CREATE TABLE "error" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
                "statusCode" int NOT NULL,
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
                "createdAt" timestamp NOT NULL DEFAULT now(),
                "updatedAt" timestamp NOT NULL DEFAULT now(),
                "deletedAt" timestamp NULL,
                "version" int4 NOT NULL,
                "name" varchar(45) NOT NULL,
                "tag" varchar(25) NOT NULL,
                "price" decimal(10,2) NOT NULL,
                "address" varchar(255) NOT NULL,
                "latitude" decimal(8,6) NOT NULL,
                "longitude" decimal(9,6) NOT NULL,
                "cityId" uuid NOT NULL,
                CONSTRAINT "city_fk"
                FOREIGN KEY("cityId") 
                REFERENCES city(id)
            );

            DROP TABLE IF EXISTS "amount" CASCADE;
            CREATE TABLE "amount" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
                "value" decimal(10,2) NOT NULL,
                "currency" varchar(20) NOT NULL,
                "orderCreatedAt" timestamp NOT NULL,
                "userEmail" varchar(45) NOT NULL
            );

            DROP TABLE IF EXISTS "order" CASCADE;
            CREATE TABLE "order" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
                "publicId" uuid NOT NULL,
                "createdAt" timestamp NOT NULL DEFAULT now(),
                "updatedAt" timestamp NOT NULL DEFAULT now(),
                "deletedAt" timestamp NULL,
                "version" int4 NOT NULL,
                "type" varchar(20) NOT NULL,
                "state" varchar(20) NOT NULL,
                "captureMode" varchar(45) NOT NULL,
                "merchantOrderExtRef" varchar(255) NOT NULL,
                "email" varchar(45) NOT NULL,
                "amountId" uuid NOT NULL,
                "checkoutUrl" varchar(255) NOT NULL,
                "userId" uuid NOT NULL,
                "restroomId" uuid NOT NULL,
                CONSTRAINT "FK_OrderAmount"
                FOREIGN KEY("amountId") REFERENCES amount(id),
                CONSTRAINT "FK_OrderUser"
                FOREIGN KEY("userId") REFERENCES "user"(id),
                CONSTRAINT "FK_OrderRestroom"
                FOREIGN KEY("restroomId") REFERENCES restroom(id)
            );     

            DROP TABLE IF EXISTS "order_error" CASCADE;
            CREATE TABLE "order_error" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
                "orderId" uuid NOT NULL,
                "errorId" uuid NOT NULL,
                "timestamp" int NOT NULL,
                CONSTRAINT "FK_Order_errorError"
                FOREIGN KEY("errorId") REFERENCES error(id), 
                CONSTRAINT "FK_Order_errorOrder"
                FOREIGN KEY("orderId") REFERENCES "order"(id) 
            );
            `
        );
    }

    down(): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
