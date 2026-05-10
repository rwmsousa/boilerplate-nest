import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { UserModule } from './user/user.module';
import { SeederModule } from './seeder/seeder.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import * as dotenv from 'dotenv';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { ClientsService } from './clients/clients.service';
import { ClientsController } from './clients/clients.controller';
import { User } from './entities/user.entity';
import { Client } from './entities/client.entity';

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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...(databaseUrl
        ? { url: databaseUrl }
        : {
            host: databaseHost,
            port: databasePort,
            database: process.env.DATABASE_NAME,
          }),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      synchronize: shouldSynchronize,
      schema: process.env.DATABASE_SCHEMA,
      logging: shouldLogQueries,
      ssl: shouldUseSsl ? { rejectUnauthorized: false } : false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
    }),
    ClientsModule,
    UserModule,
    SeederModule,
    TypeOrmModule.forFeature([User, Client]),
  ],
  controllers: [AppController, UserController, ClientsController],
  providers: [AppService, UserService, ClientsService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'clients', method: RequestMethod.GET },
        { path: 'clients/:id', method: RequestMethod.GET },
        { path: 'clients/:id', method: RequestMethod.PUT },
        { path: 'clients/:id', method: RequestMethod.DELETE },
        { path: 'user/register', method: RequestMethod.POST },
        { path: 'user', method: RequestMethod.GET },
        { path: 'user/:id', method: RequestMethod.GET },
        { path: 'user', method: RequestMethod.PUT },
        { path: 'user', method: RequestMethod.DELETE },
      );
  }
}
