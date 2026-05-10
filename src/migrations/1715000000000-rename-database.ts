import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Renames the PostgreSQL database from "railway" to "boilerplate_nest".
 *
 * IMPORTANT: This migration cannot be run via the standard TypeORM migration
 * runner because ALTER DATABASE cannot be executed while connected to the
 * database being renamed. Instead, run the provided shell script from the
 * project root:
 *
 *   bash rename-db.sh
 *
 * The script connects to the "postgres" system database and performs the
 * rename from there. After running it, update DATABASE_NAME (or DATABASE_URL)
 * in your environment to point to "boilerplate_nest".
 *
 * The up/down methods below are intentional no-ops so that TypeORM does not
 * attempt to execute the statement while connected to the target database.
 */
export class RenameDatabase1715000000000 implements MigrationInterface {
  name = 'RenameDatabase1715000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Cannot rename the current database from within an active connection to it.
    // Run rename-db.sh instead:
    //   bash rename-db.sh
    console.warn(
      '[RenameDatabase1715000000000] Skipping ALTER DATABASE inside migration. ' +
        'Run `bash rename-db.sh` from the project root to rename the database, ' +
        'then update DATABASE_NAME / DATABASE_URL in your environment.',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert: rename boilerplate_nest back to railway.
    // Connect to the "postgres" system database and run:
    //   ALTER DATABASE boilerplate_nest RENAME TO railway;
    console.warn(
      '[RenameDatabase1715000000000] Skipping ALTER DATABASE inside migration. ' +
        'To revert, connect to the "postgres" system database and run: ' +
        'ALTER DATABASE boilerplate_nest RENAME TO railway;',
    );
  }
}
