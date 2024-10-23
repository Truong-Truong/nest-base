import { config } from 'dotenv';
import * as path from 'path';
config({ path: path.resolve(process.cwd(), '.env') });

import appConfig from '@app/configs/app.config';
import { IRedisConfig } from '@app/shares/app.interface';
import { CacheModuleOptions } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';

const redis: IRedisConfig = appConfig().redis;
export const CacheRedisOptions: CacheModuleOptions = {
  isGlobal: true,
  store: redisStore,
  host: redis.host,
  port: redis.port,
  // 1 minute
  ttl: 60 * 20,
};
