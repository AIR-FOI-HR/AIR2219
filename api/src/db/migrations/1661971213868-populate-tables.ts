import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertData1661971213868 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const schemaName: string = process.env.DB_SCHEMA || 'eflush_app';

        await queryRunner.query(`set schema '${schemaName}';`);
        
        await queryRunner.query(`
            INSERT INTO "user" VALUES
            ( '498cdfca-d855-42c4-b50c-2f9fec357cc2', '2022-12-01 13:00:00.000', '2022-12-01 13:00:00.000', NULL, 1, 'admin', 'admic', 'admin@mail.com', '091 111 1111', 'admin', 'ADMIN', 'ACTIVE' ),
            ( '60c8837a-87d1-4f7e-b4ed-7d260a8ceed7', '2022-11-02 15:40:01.000', '2022-11-02 15:40:01.000', NULL, 1, 'obican', 'obicanko', 'obican@mail.com', '091 111 1111', 'obican', 'USER', 'ACTIVE' ),
            ( '21d26684-8652-4b2c-baab-199d0853d778', '2022-10-03 17:10:20.000', '2022-10-03 17:10:20.000', NULL, 1, 'blokiran', 'blokiranko', 'blokiran@mail.com', '091 111 1111', 'blokiran', 'USER', 'BANNED' ),
            ( '1b7f08aa-b23f-4353-b14d-68f17ac1d878', '2022-9-04 19:02:21.000', '2022-9-04 19:02:21.000', NULL, 1, 'pending', 'pendingko', 'pending@mail.com', '091 111 1111', 'pending', 'USER', 'PENDING' ),
            ( '5a04fcf5-0541-4c31-8fc2-41ab2f7af3ed', '2022-8-05 21:40:41.000', '2022-8-05 21:40:41.000', '2022-12-01 11:10:10.000', 1, 'Mimi', 'Reba', 'mimi@mail.com', '091 111 1111', 'mimi', 'USER', 'ACTIVE' );
        
            INSERT INTO "error" VALUES
            ( '5867120d-90ea-4a2f-8c7c-7347e18da6e3', 401, 'API key not present!'),
            ( '96712ca4-6c83-4af0-b76b-e9ed0359c0c3', 403, 'Invalid API key!'),
            ( 'b9706d29-b011-49b7-ba3b-d3a46971afbe', 404, 'Unsupported route!'),
            ( '33efeaee-35b0-49f3-9a0b-144ab1cd1a30', 400, 'Invalid request data!'),
            ( '90dcbb75-c9f3-460f-aff9-4d6a3d3564fd', 422, 'Incorrect card credentials!'),
            ( '2d69be42-1e9f-43ef-9760-564cff3b1c7c', 422, 'Insufficient funds!'),
            ( '9a482ec4-99d0-438d-bed4-ecb266932386', 404, 'Order can't be confirmed because it doesn't exist!'),
            ( 'e4a2587b-96d9-42e6-903d-23bf13b75743', 422, 'Order has expired and can't be confirmed!');
        `
        );
    }

    public async down(): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
