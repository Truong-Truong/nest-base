import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class FilesTable1728281600765 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'nb_files',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'category',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'relation_id',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'original_name',
            type: 'varchar',
            length: '180',
          },
          {
            name: 'generate_name',
            type: 'varchar',
            length: '256',
          },
          {
            name: 'type',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'size',
            type: 'int',
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
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_by',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'updated_by',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('nb_files', true);
  }
}
