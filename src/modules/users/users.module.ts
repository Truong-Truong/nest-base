import { Module } from '@nestjs/common';
import { UsersController } from '@users/users.controller';
import { UsersService } from '@users/users.service';
import { UsersRepository } from '@users/users.repository';
import { ConfigModule } from '@nestjs/config';
import moduleConfig from '@users/configs/module.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import AllEntities from '@app/entities/all.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LogEntryInterceptor } from '@app/shares/log-entry.interceptor';
import { SystemLogger } from '@app/shares/logger/system.logger';

@Module({
  controllers: [UsersController],
  imports: [
    ConfigModule.forFeature(moduleConfig),
    TypeOrmModule.forFeature([...AllEntities]),
  ],
  providers: [
    UsersService,
    SystemLogger,
    {
      provide: 'USER_REPOSITORY',
      useClass: UsersRepository,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LogEntryInterceptor,
    },
  ],
})
export class UsersModule {}
