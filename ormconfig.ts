// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '../.env' });

import type { ConnectionOptions } from 'typeorm';

/**
 *
 *  This file should be used for migrations & seeds only.
 *
 */

console.log(
  `TypeORM is configured to connect to: ${process.env.DB_NAME}, NODE_ENV=${process.env.NODE_ENV}`,
);

const isProduction = process.env.NODE_ENV === 'production';

const config: Array<ConnectionOptions> = [
  {
    type: 'postgres',
    entities: isProduction
      ? [__dirname + '/**/**.entity.js']
      : [__dirname + '/**/**.entity.ts'],

    database: process.env.DB_NAME,
    // debug: true,
    logging: true,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST ?? 'localhost',
    synchronize: false,
    migrationsRun: true,
    migrationsTableName: 'migrations_table',
    migrations: isProduction
      ? [__dirname + '/src/db/migrations/*.js']
      : [__dirname + '/src/db/migrations/*.ts'],
    cli: {
      migrationsDir: './src/db/migrations',
    },
  },
  {
    name: 'seeds',
    type: 'postgres',
    database: process.env.DB_NAME,
    // debug: true,
    logging: true,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST ?? 'localhost',
    synchronize: false,
    migrationsRun: true,
    migrationsTableName: 'seeds_table',
    entities: isProduction
      ? [__dirname + '/**/**.entity.js']
      : [__dirname + '/**/**.entity.ts'],
    migrations: isProduction
      ? [__dirname + '/src/db/seeds/*.js']
      : [__dirname + '/src/db/seeds/*.ts'],
    cli: {
      migrationsDir: './src/db/seeds',
    },
  },
];

export default config;
