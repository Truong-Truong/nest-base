import { Module } from '@nestjs/common';
import { UsersModule } from '@users/users.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@app/configs/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './typeorm-data-source';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
    }),
    UsersModule,
  ],
})
export class AppModule {}
