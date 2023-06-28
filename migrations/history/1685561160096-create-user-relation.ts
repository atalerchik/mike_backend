import { MigrationInterface, QueryRunner, Table } from "typeorm";

const TABLE_NAME = "users";

export class CreateUserRelation1685561160096 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TABLE_NAME,
        columns: [
          {
            name: "id",
            type: "uuid",
            isGenerated: true,
            generationStrategy: "uuid",
            isPrimary: true,
          },
          {
            name: "password",
            type: "varchar",
            length: "128",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            length: "328",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "authorization_token",
            type: "uuid",
            isNullable: true,
            isUnique: true,
          },
          {
            name: "activation_token",
            type: "uuid",
            isNullable: true,
            isUnique: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_NAME);
  }
}
