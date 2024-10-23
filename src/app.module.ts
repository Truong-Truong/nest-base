import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersModule } from '@users/users.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@app/configs/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './typeorm-data-source';
import { IpWhitelistMiddleware } from '@app/middlewares/ip-white-list.middleware';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
    }),
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
