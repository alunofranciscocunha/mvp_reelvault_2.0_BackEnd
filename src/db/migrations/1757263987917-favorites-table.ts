import { MigrationInterface, QueryRunner } from 'typeorm'

export class FavoritesTable1757263987917 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "favorites" (
        "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "user_id" UUID NOT NULL,
        "movie_id" INTEGER NOT NULL,
        "poster_path" VARCHAR,
        "title" VARCHAR NOT NULL,
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE ("user_id", "movie_id"),
        FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "favorites";`)
  }
}