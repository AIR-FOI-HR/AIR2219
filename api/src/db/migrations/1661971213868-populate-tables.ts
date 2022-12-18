import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertData1661971213868 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const schemaName: string = process.env.DB_SCHEMA || 'eflush_app';

        await queryRunner.query(`set schema '${schemaName}';`);
        
        await queryRunner.query(`
            INSERT INTO "user" VALUES
            ( '498cdfca-d855-42c4-b50c-2f9fec357cc2', '2022-12-01 13:00:00.000', '2022-12-01 13:00:00.000', NULL, 1, 'admin', 'admic', 'admin@mail.com', '091 111 1111', '$argon2id$v=19$m=65536,t=3,p=4$4J45ikrVP6rZXCk9pb9Xog$LEmDbLehEEAlEtOfeH9dpEKu9sDTGmsLdrua0BPlAYk', 'ADMIN', 'ACTIVE' ),
            ( '60c8837a-87d1-4f7e-b4ed-7d260a8ceed7', '2022-11-02 15:40:01.000', '2022-11-02 15:40:01.000', NULL, 1, 'obican', 'obicanko', 'obican@mail.com', '091 111 1111', '$argon2id$v=19$m=65536,t=3,p=4$4J45ikrVP6rZXCk9pb9Xog$LEmDbLehEEAlEtOfeH9dpEKu9sDTGmsLdrua0BPlAYk', 'USER', 'ACTIVE' ),
            ( '21d26684-8652-4b2c-baab-199d0853d778', '2022-10-03 17:10:20.000', '2022-10-03 17:10:20.000', NULL, 1, 'blokiran', 'blokiranko', 'blokiran@mail.com', '091 111 1111', '$argon2id$v=19$m=65536,t=3,p=4$4J45ikrVP6rZXCk9pb9Xog$LEmDbLehEEAlEtOfeH9dpEKu9sDTGmsLdrua0BPlAYk', 'USER', 'BANNED' ),
            ( '5a04fcf5-0541-4c31-8fc2-41ab2f7af3ed', '2022-8-05 21:40:41.000', '2022-8-05 21:40:41.000', '2022-12-01 11:10:10.000', 1, 'Mimi', 'Reba', 'mimi@mail.com', '091 111 1111', '$argon2id$v=19$m=65536,t=3,p=4$4J45ikrVP6rZXCk9pb9Xog$LEmDbLehEEAlEtOfeH9dpEKu9sDTGmsLdrua0BPlAYk', 'USER', 'ACTIVE' );
        
            INSERT INTO "error" VALUES
            ( '5867120d-90ea-4a2f-8c7c-7347e18da6e3', 401, 'API key not present!'),
            ( '96712ca4-6c83-4af0-b76b-e9ed0359c0c3', 403, 'Invalid API key!'),
            ( 'b9706d29-b011-49b7-ba3b-d3a46971afbe', 404, 'Unsupported route!'),
            ( '33efeaee-35b0-49f3-9a0b-144ab1cd1a30', 400, 'Invalid request data!'),
            ( '90dcbb75-c9f3-460f-aff9-4d6a3d3564fd', 422, 'Incorrect card credentials!'),
            ( '2d69be42-1e9f-43ef-9760-564cff3b1c7c', 422, 'Insufficient funds!'),
            ( '9a482ec4-99d0-438d-bed4-ecb266932386', 404, 'Order can not be confirmed because it does not exist!'),
            ( 'e4a2587b-96d9-42e6-903d-23bf13b75743', 422, 'Order has expired and can not be confirmed!');
            
            INSERT INTO "admin_options" VALUES
            ( '128b9137-ccd2-412b-aa1f-920057cc8701', now(), now(), NULL, 1, 'admin@eflushapp.com', '+385990000000', 'EUR', 'AUTOMATIC');

            INSERT INTO "city" VALUES
            ('af2cf8c0-513c-4d1f-a061-0bd46a7b2a36', 'Varaždin', '42000'),
            ('ab1fce53-64ca-4398-8541-f5ff47bc9dc7', 'Zagreb', '10000'),
            ('5611b312-da8b-4e90-8bc3-0372c144c22e', 'Split', '21000'),
            ('064f4bd5-96b3-4b58-b9ad-04ecb874abb8', 'Rijeka', '51000'),
            ('caac5312-2a93-4a0f-8c93-2cd68b0d18be', 'Osijek', '31000');

            INSERT INTO restroom VALUES
            ('95b17ff6-4036-4020-be2c-a9751518af4f', now(), now(), null, 1, 'FOI1', 'eFlush-WnmqqYYrWc', 0.4, 'Pavlinska ul. 2', 46.30770732889613, 16.338047018104785, 'af2cf8c0-513c-4d1f-a061-0bd46a7b2a36'),
            ('54ccab34-df7a-4d09-ac3b-88eface2c780', now(), now(), null, 1, 'FOI2', 'eFlush-eBjhjZOvxG', 0.5, 'Prilaz Fausta Vrančića 3', 46.309320610288765, 16.342742220051523, 'af2cf8c0-513c-4d1f-a061-0bd46a7b2a36');

            INSERT INTO amount VALUES
            ('6b53fe77-8643-45ac-a7da-7b5d7958fb42',0.40,'EUR','2022-12-06 15:52:37.513937','admin@mail.com'),
            ('4cf36de6-a6dd-40c2-8523-be5eaafe9986',0.50,'EUR','2022-12-06 15:57:50.904053','obican@mail.com'),
            ('67a5a5f1-182e-4d7f-b39e-42da85c2296e',0.40,'EUR','2022-12-06 15:57:50.912413','blokiran@mail.com'),
            ('cdff709e-3bbd-413a-a01c-61d670e5872b',0.50,'EUR','2022-12-06 15:57:50.914728','mimi@mail.com');

            INSERT INTO "order" VALUES
            ('852a090d-5580-4d97-8f3d-d95fc9e3f48a','b6b6cd73-939b-485f-96cd-f782508336c1','2022-12-06 17:39:57.722059','2022-12-06 17:39:57.722059',NULL,1,'PAYMENT','PENDING','AUTOMATIC','Order test','admin@mail.com','6b53fe77-8643-45ac-a7da-7b5d7958fb42','https://www.eflush.hr/checkout/852a090d-5580-4d97-8f3d-d95fc9e3f48a','498cdfca-d855-42c4-b50c-2f9fec357cc2','95b17ff6-4036-4020-be2c-a9751518af4f'),
            ('6752599b-637c-4e16-952e-2b1c440bceda','2ff50f1c-065a-454a-84f1-f266822b3820','2022-12-06 17:39:57.729498','2022-12-06 17:39:57.729498',NULL,1,'PAYMENT','COMPLETED','AUTOMATIC','Order test','obican@mail.com','4cf36de6-a6dd-40c2-8523-be5eaafe9986','https://www.eflush.hr/checkout/6752599b-637c-4e16-952e-2b1c440bceda','60c8837a-87d1-4f7e-b4ed-7d260a8ceed7','95b17ff6-4036-4020-be2c-a9751518af4f'),
            ('38d168db-fa8d-4c5f-8a90-afbcb601836b','9f4569f4-2ea7-40db-abc1-888c85a7a9ac','2022-12-06 17:39:57.733014','2022-12-06 17:39:57.733014',NULL,1,'PAYMENT','COMPLETED','AUTOMATIC','Order test','blokiran@mail.com','67a5a5f1-182e-4d7f-b39e-42da85c2296e','https://www.eflush.hr/checkout/38d168db-fa8d-4c5f-8a90-afbcb601836b','21d26684-8652-4b2c-baab-199d0853d778','54ccab34-df7a-4d09-ac3b-88eface2c780'),
            ('a7332f6e-dfae-4931-b126-e137a83a45f6','c4374a7a-c641-48a6-b2aa-87810aee47b7','2022-12-06 17:39:57.735703','2022-12-06 17:39:57.735703',NULL,1,'PAYMENT','PENDING','AUTOMATIC','Order test','mimi@mail.com','cdff709e-3bbd-413a-a01c-61d670e5872b','https://www.eflush.hr/checkout/a7332f6e-dfae-4931-b126-e137a83a45f6','5a04fcf5-0541-4c31-8fc2-41ab2f7af3ed','54ccab34-df7a-4d09-ac3b-88eface2c780');
       
            INSERT INTO order_error VALUES
            ('1768a522-4edb-44fb-b901-77d730d517b6','38d168db-fa8d-4c5f-8a90-afbcb601836b','2d69be42-1e9f-43ef-9760-564cff3b1c7c',1670415370701),
            ('9d3edbc7-cdc9-4bf6-a8e5-da5eb883dd05','6752599b-637c-4e16-952e-2b1c440bceda','b9706d29-b011-49b7-ba3b-d3a46971afbe',1670415350701),
            ('d0e323c3-0b9a-43c3-a0a2-ca640b081880','852a090d-5580-4d97-8f3d-d95fc9e3f48a','96712ca4-6c83-4af0-b76b-e9ed0359c0c3',1670415270701),
            ('478b90d7-cfc9-4b38-8880-96365319715d','a7332f6e-dfae-4931-b126-e137a83a45f6','2d69be42-1e9f-43ef-9760-564cff3b1c7c',1670415350701);
        `
        );
    }

    public async down(): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
