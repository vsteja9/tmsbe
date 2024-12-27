import { MigrationInterface, QueryRunner } from "typeorm";

export class Taskstatusadded1734929343652 implements MigrationInterface {
    name = 'Taskstatusadded1734929343652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Task" ADD "status" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Task" DROP COLUMN "status"`);
    }

}
