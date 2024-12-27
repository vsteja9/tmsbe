import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialsetup1735129200312 implements MigrationInterface {
    name = 'Initialsetup1735129200312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "role" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, "status" character varying NOT NULL, "projectId" uuid, "userId" uuid, CONSTRAINT "PK_95d9364b8115119ba8b15a43592" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, "isDeleted" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_966e2b9904b88ebc9da7bee728d" UNIQUE ("name"), CONSTRAINT "PK_2725f461500317f74b0c8f11859" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Task" ADD CONSTRAINT "FK_66691c65e70889fbed0acf4d416" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Task" ADD CONSTRAINT "FK_b9a04beac0d49f34e711895715c" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Task" DROP CONSTRAINT "FK_b9a04beac0d49f34e711895715c"`);
        await queryRunner.query(`ALTER TABLE "Task" DROP CONSTRAINT "FK_66691c65e70889fbed0acf4d416"`);
        await queryRunner.query(`DROP TABLE "Project"`);
        await queryRunner.query(`DROP TABLE "Task"`);
        await queryRunner.query(`DROP TABLE "User"`);
    }

}
