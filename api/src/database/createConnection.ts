import { createConnection, Connection } from 'typeorm';

import * as entities from 'entities';

const createDatabaseConnection = (): Promise<Connection> =>
  createConnection({
    type: 'mariadb',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    // url: process.env.DB_URL,
    entities: Object.values(entities),
    synchronize: true,
  });

export default createDatabaseConnection;
