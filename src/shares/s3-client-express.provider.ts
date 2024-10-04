import { Injectable } from '@nestjs/common';
import { SystemLogger } from '@app/libs/logger/system.logger';
import { S3ClientExpress } from '@app/libs/s3-client-express.lib';
import { S3ClientConfig } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3ClientExpressProvider {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: SystemLogger,
  ) {}

  createS3Client(s3Config: S3ClientConfig): S3ClientExpress {
    return new S3ClientExpress(this.logger, this.configService, s3Config);
  }
}
