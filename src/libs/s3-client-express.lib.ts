import {
  GetObjectCommand,
  GetObjectCommandInput,
  S3Client,
  S3ClientConfig,
} from '@aws-sdk/client-s3';
import { sleep } from './common.lib';
import { SystemLogger } from '@app/libs/logger/system.logger';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3ClientExpress {
  private readonly s3Client: S3Client;
  constructor(
    private readonly logger: SystemLogger,
    private readonly configService: ConfigService,
    s3Config: S3ClientConfig,
  ) {
    if (this.configService.get<string>('app_env') == 'local') {
      Object.assign(s3Config, {
        endpoint: `http://${this.configService.get<string>('ip_local')}:${this.configService.get<string>('port_s3_local')}/`,
        forcePathStyle: true,
      });
    }
    this.logger.info('s3Config', s3Config);
    this.s3Client = new S3Client(s3Config);
  }

  getS3(): S3Client {
    return this.s3Client;
  }

  async getObject(params: GetObjectCommandInput): Promise<any> {
    return await this.getS3().send(new GetObjectCommand(params));
  }

  async retry(
    commandClass: any,
    params: any,
    ms: number = 2000,
    maxTimes: number = 5,
    currentTimes: number = 0,
    currentError: Error = new Error(),
  ): Promise<any> {
    currentTimes++;
    if (currentTimes > maxTimes) {
      throw currentError;
    }
    try {
      const cmd = new commandClass(params);
      this.logger.warn(
        `retry ${cmd?.constructor?.name} --- ${currentTimes} times`,
        params,
      );
      const res = await this.s3Client.send(cmd);
      return res;
    } catch (error) {
      currentError = error;
      await sleep(ms);
      return await this.retry(
        commandClass,
        params,
        ms,
        maxTimes,
        currentTimes,
        currentError,
      );
    }
  }
}
