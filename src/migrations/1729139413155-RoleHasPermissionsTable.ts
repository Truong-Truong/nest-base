import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class RoleHasPermissionsTable1729139413155
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'nb_role_has_permissions',
        columns: [
          {
            name: 'permission_id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'role_id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('nb_role_has_permissions');
  }
}
