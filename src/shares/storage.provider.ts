import { Injectable } from '@nestjs/common';
import { SystemLogger } from '@app/libs/logger/system.logger';
import { ConfigService } from '@nestjs/config';
import { IFileSystems } from './app.interface';
import { Storage } from '@app/libs/storage.lib';

@Injectable()
export class StorageProvider {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: SystemLogger,
  ) {}

  createStorage(fileSystemConfig: IFileSystems) {
    return new Storage(fileSystemConfig, this.logger, this.configService);
  }
}
