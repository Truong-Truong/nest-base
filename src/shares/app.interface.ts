export interface IAppConfig {
  app_env: string;
  app_name: string;
  app_port: number;
  app_pagination_limit: number;
  static_dir: string;
  mysql_master_config: IDbConfig;
  ip_local: string;
  port_s3_local: number;
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

export interface IFileSystems {
  default: string;
  cloud: string;
  disks: {
    local: IFileSystemLocalConfig;
    s3: IFileSystemS3Config;
  };
}

export interface IFileSystemLocalConfig {
  root: string;
}

export interface IFileSystemS3Config {
  region: string;
  bucket: string;
  prefix: string;
  aws_access_key_id?: string;
  aws_secret_access_key?: string;
}
