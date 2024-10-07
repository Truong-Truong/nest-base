import { FileStorage } from '@flystorage/file-storage';
import { AwsS3StorageAdapter } from '@flystorage/aws-s3';
import { S3ClientConfig } from '@aws-sdk/client-s3';
import { LocalStorageAdapter } from '@flystorage/local-fs';
import { SystemLogger } from '@app/libs/logger/system.logger';
import { ConfigService } from '@nestjs/config';
import { S3ClientExpress } from '@app/libs/s3-client-express.lib';
import { IFileSystems, IFileSystemS3Config } from '@app/shares/app.interface';

export class Storage {
  protected disks: any = {};
  constructor(
    public fileSystemConfig: IFileSystems,
    private readonly logger: SystemLogger,
    private readonly configService: ConfigService,
  ) {}

  disk(disk: string = 'local'): FileStorage {
    if (this.disks[disk]) {
      return this.disks[disk];
    }
    switch (disk) {
      case 's3':
        this.disks[disk] = this.getS3Disk();
        break;

      default:
        this.disks[disk] = this.getLocalDisk();
        break;
    }
    return this.disks[disk];
  }

  cloud(): FileStorage {
    return this.disk(this.getDefaultCloudDriver());
  }

  protected getDefaultDriver() {
    return this.fileSystemConfig?.default ?? 'local';
  }

  protected getDefaultCloudDriver() {
    return this.fileSystemConfig?.cloud ?? 's3';
  }

  protected getS3Disk(): FileStorage {
    this.logger.info('getS3Disk() ', this.fileSystemConfig.disks.s3);
    const s3FileSystem: IFileSystemS3Config = this.fileSystemConfig.disks.s3;
    const s3Config: S3ClientConfig = {
      region: s3FileSystem.region,
    };
    if (s3FileSystem.aws_access_key_id && s3FileSystem.aws_secret_access_key) {
      s3Config.credentials = {
        accessKeyId: s3FileSystem.aws_access_key_id,
        secretAccessKey: s3FileSystem.aws_secret_access_key,
      };
    }
    const s3ClientExpress = new S3ClientExpress(
      this.logger,
      this.configService,
      s3Config,
    );
    const client = s3ClientExpress.getS3();
    console.log('xlient', client);
    const adapter = new AwsS3StorageAdapter(client, {
      bucket: this.fileSystemConfig.disks.s3.bucket || '',
      prefix: this.fileSystemConfig.disks.s3.prefix,
    });
    return new FileStorage(adapter);
  }

  protected getLocalDisk(): FileStorage {
    this.logger.info('getLocalDisk() ', this.fileSystemConfig.disks.local);
    const rootDirectory = this.fileSystemConfig.disks.local.root;
    const adapter = new LocalStorageAdapter(rootDirectory);
    return new FileStorage(adapter);
  }
}
