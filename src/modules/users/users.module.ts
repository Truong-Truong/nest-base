import { Module } from '@nestjs/common';
import { UsersController } from '@users/users.controller';
import { UsersService } from '@users/users.service';
import { UsersRepository } from '@users/users.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import moduleConfig from '@users/configs/module.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import AllEntities from '@app/entities/all.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LogEntryInterceptor } from '@app/middlewares/log-entry.interceptor';
import { SystemLogger } from '@app/libs/logger/system.logger';
import { IFileSystems } from '@app/shares/app.interface';
import { StorageProvider } from '@app/shares/storage.provider';

@Module({
  controllers: [UsersController],
  imports: [
    ConfigModule.forFeature(moduleConfig),
    TypeOrmModule.forFeature([...AllEntities]),
  ],
  providers: [
    UsersService,
    SystemLogger,
    StorageProvider,
    {
      provide: 'USER_REPOSITORY',
      useClass: UsersRepository,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LogEntryInterceptor,
    },
    {
      provide: 'MY_STORAGE',
      inject: [ConfigService, StorageProvider],
      useFactory: (
        configService: ConfigService,
        storageProvider: StorageProvider,
      ) => {
        const fileSystemsConfig: IFileSystems =
          configService.get<IFileSystems>('fileSystems');
        return storageProvider.createStorage(fileSystemsConfig);
      },
    },
  ],
})
export class UsersModule {}
