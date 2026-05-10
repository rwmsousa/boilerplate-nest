import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const parseBoolean = (value?: string): boolean => {
  if (!value) {
    return false;
  }

  return ['true', '1', 'yes', 'on'].includes(value.toLowerCase());
};

const databaseUrl = process.env.DATABASE_URL;
const rawDatabaseHost = process.env.DATABASE_HOST ?? 'localhost';
const [databaseHost, hostPort] = rawDatabaseHost.split(':');
const databasePort = Number(process.env.DATABASE_PORT ?? hostPort ?? 5432);
const shouldSynchronize = parseBoolean(
  process.env.DATABASE_SYNCHRONIZE ?? process.env.DATABASE_SYNCRONIZE,
);
const shouldLogQueries = parseBoolean(process.env.DATABASE_LOGGING);
const shouldUseSsl = parseBoolean(process.env.DATABASE_SSL);

export const AppDataSource = new DataSource(
  databaseUrl
    ? {
        type: 'postgres',
        url: databaseUrl,
        synchronize: shouldSynchronize,
        schema: process.env.DATABASE_SCHEMA,
        logging: shouldLogQueries,
        ssl: shouldUseSsl ? { rejectUnauthorized: false } : false,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
      }
    : {
        type: 'postgres',
        host: databaseHost,
        port: databasePort,
        database: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        synchronize: shouldSynchronize,
        schema: process.env.DATABASE_SCHEMA,
        logging: shouldLogQueries,
        ssl: shouldUseSsl ? { rejectUnauthorized: false } : false,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
      },
);
