import { config } from 'dotenv';
import * as path from 'path';
config({ path: path.resolve(process.cwd(), '.env') });

import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersModule } from '@users/users.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@app/configs/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '@app/configs/typeorm.config';
import { IpWhitelistMiddleware } from '@app/middlewares/ip-white-list.middleware';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheRedisOptions } from '@app/configs/redis.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
    }),
    CacheModule.register(CacheRedisOptions),
    // CacheModule.registerAsync({
    //   isGlobal: true,
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => {
    //     console.log(configService.get<string>('redis'));
    //     return {
    //       store: redisStore,
    //       host: configService.get<string>('redis.host'),
    //       port: configService.get<string>('redis.port'),
    //       // 1 minute
    //       ttl: 60 * 20,
    //     };
    //   },
    // }),
    UsersModule,
  ],
})
export class AppModule {
  // use for all routes of application
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IpWhitelistMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
