import { MigrationInterface, QueryRunner } from "typeorm";

export class Relationsnamesupdated1735115725233 implements MigrationInterface {
    name = 'Relationsnamesupdated1735115725233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Task" DROP CONSTRAINT "FK_5228d4fde96f904d60685666531"`);
        await queryRunner.query(`ALTER TABLE "Task" DROP CONSTRAINT "FK_594532cbb535d14384d9592623e"`);
        await queryRunner.query(`ALTER TABLE "Task" DROP COLUMN "projectIdId"`);
        await queryRunner.query(`ALTER TABLE "Task" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "Task" ADD "projectId" uuid`);
        await queryRunner.query(`ALTER TABLE "Task" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "Task" ADD CONSTRAINT "FK_66691c65e70889fbed0acf4d416" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Task" ADD CONSTRAINT "FK_b9a04beac0d49f34e711895715c" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Task" DROP CONSTRAINT "FK_b9a04beac0d49f34e711895715c"`);
        await queryRunner.query(`ALTER TABLE "Task" DROP CONSTRAINT "FK_66691c65e70889fbed0acf4d416"`);
        await queryRunner.query(`ALTER TABLE "Task" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "Task" DROP COLUMN "projectId"`);
        await queryRunner.query(`ALTER TABLE "Task" ADD "userIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "Task" ADD "projectIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "Task" ADD CONSTRAINT "FK_594532cbb535d14384d9592623e" FOREIGN KEY ("userIdId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Task" ADD CONSTRAINT "FK_5228d4fde96f904d60685666531" FOREIGN KEY ("projectIdId") REFERENCES "Project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
