import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateApplicationsTable1708570170166 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'applications',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'applicant_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'status',
                    type: 'varchar',
                    length: '20',
                    isNullable: false,
                },
                {
                    name: 'submission_date',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }));

        await queryRunner.createForeignKey('applications', new TableForeignKey({
            columnNames: ['applicant_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('applications');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('applicant_id') !== -1);
        await queryRunner.dropForeignKey('applications', foreignKey);
        await queryRunner.dropTable('applications');
    }

}
