import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNotesTable1739750949183 implements MigrationInterface {
    name = 'UpdateNotesTable1739750949183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notes" ("id" SERIAL NOT NULL, "title" text NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_token" ("id" SERIAL NOT NULL, "token" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "expiresAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_829532ff766505ad7c71592c6a5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_829532ff766505ad7c71592c6a5"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
        await queryRunner.query(`DROP TABLE "notes"`);
    }

}
