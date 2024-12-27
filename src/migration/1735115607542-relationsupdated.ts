import { MigrationInterface, QueryRunner } from "typeorm";

export class Relationsupdated1735115607542 implements MigrationInterface {
    name = 'Relationsupdated1735115607542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Task" DROP COLUMN "projectId"`);
        await queryRunner.query(`ALTER TABLE "Task" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "Task" ADD "projectIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "Task" ADD "userIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "Task" ADD CONSTRAINT "FK_5228d4fde96f904d60685666531" FOREIGN KEY ("projectIdId") REFERENCES "Project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Task" ADD CONSTRAINT "FK_594532cbb535d14384d9592623e" FOREIGN KEY ("userIdId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Task" DROP CONSTRAINT "FK_594532cbb535d14384d9592623e"`);
        await queryRunner.query(`ALTER TABLE "Task" DROP CONSTRAINT "FK_5228d4fde96f904d60685666531"`);
        await queryRunner.query(`ALTER TABLE "Task" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "Task" DROP COLUMN "projectIdId"`);
        await queryRunner.query(`ALTER TABLE "Task" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Task" ADD "projectId" character varying NOT NULL`);
    }

}
