import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUsersTable1708570100736 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'username',
                    type: 'varchar',
                    length: '50',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'role_id',
                    type: 'int',
                    isNullable: false,
                },
            ],
        }));

        await queryRunner.createForeignKey('users', new TableForeignKey({
            columnNames: ['role_id'],
            referencedTableName: 'roles',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('users');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('role_id') !== -1);
        await queryRunner.dropForeignKey('users', foreignKey);
        await queryRunner.dropTable('users');
    }

}
