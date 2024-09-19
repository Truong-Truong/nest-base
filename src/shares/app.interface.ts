export interface IAppConfig {
  app_env: string;
  app_name: string;
  app_port: number;
  static_dir: string;
  mysql_master_config: IDbConfig;
}

export interface IDbConfig {
  type: string;
  connection_name: string;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}
