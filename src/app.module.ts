import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './configs/app.config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import UserEntityIndex from './modules/users/entities/all.entity';
import { IDbConfig } from './shares/app.interface';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mysqlMasterConfig = configService.get<IDbConfig>(
          'mysql_master_config',
        );
        return {
          type: mysqlMasterConfig.type,
          host: mysqlMasterConfig.host,
          port: mysqlMasterConfig.port,
          username: mysqlMasterConfig.username,
          password: mysqlMasterConfig.password,
          database: mysqlMasterConfig.database,
          entities: [...UserEntityIndex],
          synchronize: true, // must not use in prd env, replace with migration
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    UsersModule,
  ],
})
export class AppModule {}
