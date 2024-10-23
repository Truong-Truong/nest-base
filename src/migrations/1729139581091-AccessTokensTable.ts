import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class AccessTokensTable1729139581091 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'nb_access_tokens',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'access_token_id',
            type: 'text',
          },
          {
            name: 'access_token_revoked',
            type: 'tinyint',
            default: '0',
          },
          {
            name: 'access_token_expires_at',
            type: 'timestamp',
          },
          {
            name: 'refresh_token_id',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'refresh_token_expires_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    const foreignKeyUserToken = new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'nb_users',
      onDelete: 'CASCADE',
      name: 'fk_access_token_user_id',
    });

    await queryRunner.createForeignKey('nb_access_tokens', foreignKeyUserToken);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'nb_access_tokens',
      'fk_access_token_user_id',
    );

    await queryRunner.dropTable('nb_access_tokens');
  }
}
