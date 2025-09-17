import { MigrationInterface, QueryRunner } from 'typeorm'

export class CommentsTable1757263982595 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "comments" (
                "id" SERIAL PRIMARY KEY,
                "user_id" UUID NOT NULL,
                "movie_id" INTEGER NOT NULL,
                "user_name" VARCHAR NULL,
                "title" VARCHAR NOT NULL,
                "content" TEXT NOT NULL,
                "rating" INTEGER NOT NULL,
                "isrecommended" BOOLEAN NOT NULL,
                "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
            );
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "favorites";`)
  }
}
