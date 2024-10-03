import { config } from 'dotenv';
import * as path from 'path';
config({ path: path.resolve(process.cwd(), '.env') });

import { DataSource, DataSourceOptions } from 'typeorm';
import { SqlLogger } from '@app/shares/logger/sql.logger';
import appConfig from '@app/configs/app.config';
import { IDbConfig } from './shares/app.interface';
import AllEntities from '@app/entities/all.entity';

const mysqlMasterConfig: IDbConfig = appConfig().mysql_master_config;
const options: DataSourceOptions = {
  type: mysqlMasterConfig.type as any,
  host: mysqlMasterConfig.host,
  port: mysqlMasterConfig.port,
  username: mysqlMasterConfig.username,
  password: mysqlMasterConfig.password,
  database: mysqlMasterConfig.database,
  entities: [...AllEntities],
  synchronize: false, // must not use in prd env, replace with migration
  logging: true,
  logger: new SqlLogger(),
  entityPrefix: 'nb_',
  migrations: ['./dist/migrations/*.js'],
  migrationsTableName: 'migrations',
};

export const AppDataSource = new DataSource(options);
