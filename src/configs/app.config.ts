// import * as path from 'path';
import { IAppConfig } from 'src/shares/app.interface';

export default (): IAppConfig => ({
  app_env: process.env.NODE_ENV,
  app_port: parseInt(process.env.PORT, 10) || 3333,
  app_name: process.env.APP_NAME,
  //   static_dir: path.dirname(__dirname) + '/statics/',
  static_dir: '/statics/',
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
