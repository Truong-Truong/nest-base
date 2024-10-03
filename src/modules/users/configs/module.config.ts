// import * as path from 'path';
import { IMUConfig } from '@users/interfaces/config.interface';

export default (): IMUConfig => ({
  module_name: process.env.MODULE_NAME || 'LQT-USER',
});
