// import * as path from 'path';
import { IAppConfig } from '@app/shares/app.interface';
import * as path from 'path';

export default (): IAppConfig => ({
  app_env: process.env.NODE_ENV,
  app_port: parseInt(process.env.PORT, 10) || 3333,
  app_name: process.env.APP_NAME,
  app_pagination_limit: 10,
  static_dir: path.dirname(__dirname) + '/statics/',

  ip_local: process.env.IP_LOCAL || 'localhost',
  port_s3_local: parseInt(process.env.PORT_S3_LOCAL, 10) || 4568,
  mysql_master_config: {
    type: 'mysql',
    connection_name: process.env.DB_CONNECTION || 'mysql_master',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3367,
    database: process.env.DB_DATABASE || 'base_nest',
    username: process.env.DB_USERNAME || 'base_nest_user1',
    password: process.env.DB_PASSWORD || 'base_nest_pw',
  },
});
