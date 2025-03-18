import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1742298111805 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the Users table
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "googleId" character varying NOT NULL,
        "email" character varying NOT NULL,
        "name" character varying NOT NULL,
        "avatar" character varying,
        PRIMARY KEY ("id"),
        CONSTRAINT "UQ_googleId" UNIQUE ("googleId"),
        CONSTRAINT "UQ_email" UNIQUE ("email")
      );
    `);

    // Create the RefreshTokens table
    await queryRunner.query(`
      CREATE TABLE "refresh_tokens" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "token" character varying NOT NULL,
        "userId" uuid,
        PRIMARY KEY ("id"),
        CONSTRAINT "FK_refreshToken_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
      );
    `);

    // Create the Boards table
    await queryRunner.query(`
      CREATE TABLE "boards" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying NOT NULL,
        "userId" uuid,
        PRIMARY KEY ("id"),
        CONSTRAINT "FK_board_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
      );
    `);

    // Create the BoardColumns table
    await queryRunner.query(`
      CREATE TABLE "board_columns" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "boardId" uuid,
        PRIMARY KEY ("id"),
        CONSTRAINT "FK_column_board" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE
      );
    `);

    // Create the Tasks table
    await queryRunner.query(`
      CREATE TABLE "tasks" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying NOT NULL,
        "description" character varying,
        "columnId" uuid,
        PRIMARY KEY ("id"),
        CONSTRAINT "FK_task_column" FOREIGN KEY ("columnId") REFERENCES "board_columns"("id") ON DELETE CASCADE
      );
    `);

    // Create the Subtasks table
    await queryRunner.query(`
      CREATE TABLE "subtasks" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying NOT NULL,
        "completed" boolean NOT NULL DEFAULT false,
        "taskId" uuid,
        PRIMARY KEY ("id"),
        CONSTRAINT "FK_subtask_task" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop Subtasks table
    await queryRunner.query(`DROP TABLE "subtasks";`);

    // Drop Tasks table
    await queryRunner.query(`DROP TABLE "tasks";`);

    // Drop BoardColumns table
    await queryRunner.query(`DROP TABLE "board_columns";`);

    // Drop Boards table
    await queryRunner.query(`DROP TABLE "boards";`);

    // Drop RefreshTokens table
    await queryRunner.query(`DROP TABLE "refresh_tokens";`);

    // Drop Users table
    await queryRunner.query(`DROP TABLE "users";`);
  }
}
