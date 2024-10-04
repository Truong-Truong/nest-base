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
import { S3ClientConfig } from '@aws-sdk/client-s3';
import { IFileSystemS3Config } from '@app/shares/app.interface';
import { S3ClientExpressProvider } from '@app/shares/s3-client-express.provider';

@Module({
  controllers: [UsersController],
  imports: [
    ConfigModule.forFeature(moduleConfig),
    TypeOrmModule.forFeature([...AllEntities]),
  ],
  providers: [
    UsersService,
    SystemLogger,
    S3ClientExpressProvider,
    {
      provide: 'USER_REPOSITORY',
      useClass: UsersRepository,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LogEntryInterceptor,
    },
    {
      provide: 'S3ClientExpress',
      inject: [ConfigService, S3ClientExpressProvider],
      useFactory: (
        configService: ConfigService,
        s3ClientExpressProvider: S3ClientExpressProvider,
      ) => {
        const s3FileSystem = configService.get<IFileSystemS3Config>(
          'fileSystems.disks.s3',
        );
        const s3Config: S3ClientConfig = {
          region: s3FileSystem.region,
        };
        if (
          s3FileSystem.aws_access_key_id &&
          s3FileSystem.aws_secret_access_key
        ) {
          s3Config.credentials = {
            accessKeyId: s3FileSystem.aws_access_key_id,
            secretAccessKey: s3FileSystem.aws_secret_access_key,
          };
        }
        return s3ClientExpressProvider.createS3Client(s3Config);
      },
    },
  ],
})
export class UsersModule {}
