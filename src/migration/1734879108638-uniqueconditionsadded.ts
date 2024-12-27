import { MigrationInterface, QueryRunner } from "typeorm";

export class Uniqueconditionsadded1734879108638 implements MigrationInterface {
    name = 'Uniqueconditionsadded1734879108638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "teamName"`);
        await queryRunner.query(`ALTER TABLE "Project" ADD CONSTRAINT "UQ_966e2b9904b88ebc9da7bee728d" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e"`);
        await queryRunner.query(`ALTER TABLE "Project" DROP CONSTRAINT "UQ_966e2b9904b88ebc9da7bee728d"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "teamName" character varying`);
    }

}
