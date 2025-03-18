import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Users } from "./User";
import { BoardColumn } from "./BoardColumn";

@Entity("boards")
export class Board {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => Users, (user) => user.boards, { onDelete: "CASCADE" })
  user: Users;

  @OneToMany(() => BoardColumn, (column) => column.board, { cascade: true })
  columns: BoardColumn[];
}
/**import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTables1710770189000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Users Table
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
          { name: "googleId", type: "text", isUnique: true },
          { name: "email", type: "text", isUnique: true },
          { name: "name", type: "text" },
          { name: "avatar", type: "text", isNullable: true },
        ],
      }),
      true
    );

    // Refresh Tokens Table
    await queryRunner.createTable(
      new Table({
        name: "refresh_tokens",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
          { name: "token", type: "text", isNullable: false },
          { name: "userId", type: "uuid" },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "refresh_tokens",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );

    // Boards Table
    await queryRunner.createTable(
      new Table({
        name: "boards",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
          { name: "title", type: "text" },
          { name: "userId", type: "uuid" },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "boards",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );

    // Board Columns Table
    await queryRunner.createTable(
      new Table({
        name: "board_columns",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
          { name: "name", type: "text" },
          { name: "boardId", type: "uuid" },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "board_columns",
      new TableForeignKey({
        columnNames: ["boardId"],
        referencedColumnNames: ["id"],
        referencedTableName: "boards",
        onDelete: "CASCADE",
      })
    );

    // Tasks Table
    await queryRunner.createTable(
      new Table({
        name: "tasks",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
          { name: "title", type: "text" },
          { name: "description", type: "text", isNullable: true },
          { name: "columnId", type: "uuid" },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "tasks",
      new TableForeignKey({
        columnNames: ["columnId"],
        referencedColumnNames: ["id"],
        referencedTableName: "board_columns",
        onDelete: "CASCADE",
      })
    );

    // Subtasks Table
    await queryRunner.createTable(
      new Table({
        name: "subtasks",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()" },
          { name: "title", type: "text" },
          { name: "completed", type: "boolean", default: false },
          { name: "taskId", type: "uuid" },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "subtasks",
      new TableForeignKey({
        columnNames: ["taskId"],
        referencedColumnNames: ["id"],
        referencedTableName: "tasks",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("subtasks");
    await queryRunner.dropTable("tasks");
    await queryRunner.dropTable("board_columns");
    await queryRunner.dropTable("boards");
    await queryRunner.dropTable("refresh_tokens");
    await queryRunner.dropTable("users");
  }
}
 */