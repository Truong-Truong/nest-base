// import * as path from 'path';
import { IMUConfig } from '@users/interfaces/config.interface';
import appConfig from '@app/configs/app.config';
export default (): IMUConfig => ({
  module_name: 'LQT-USER',
  fileSystems: {
    default: process.env.USERS_FILESYSTEM_DISK || 'local',
    cloud: process.env.USERS_FILESYSTEM_CLOUD || 's3',
    disks: {
      local: {
        root: appConfig().static_dir,
      },
      s3: {
        region: process.env.USERS_FILESYSTEM_AWS_REGION,
        bucket: process.env.USERS_FILESYSTEM_AWS_S3_BUCKET,
        prefix: process.env.USERS_FILESYSTEM_AWS_S3_PREFIX,
        aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
        aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
      },
    },
  },
});
