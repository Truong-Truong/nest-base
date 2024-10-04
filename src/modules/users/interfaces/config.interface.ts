import { IFileSystems } from '@app/shares/app.interface';

export interface IMUConfig {
  module_name: string;
  fileSystems: IFileSystems;
}
