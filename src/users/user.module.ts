import { Logger, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { UsersRepository } from './repositories/users.repository';
import { IFbConfig } from './interfaces/config.interface';

const FB_CONFIG: IFbConfig = {
  appId: 'Fb001',
  appSecret: 'Fb001-secret',
};

const appConfigEdited = (config: IFbConfig) => {
  const newConfig: IFbConfig = {
    appId: `new - ${config.appId}`,
    appSecret: `new - ${config.appSecret}`,
  };
  return newConfig;
};

const configLogger = (appName: string): Logger => {
  return new Logger(appName);
};

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'APP_NAME',
      useValue: 'LQT-USER',
    },
    {
      provide: 'USER_REPOSITORY',
      useClass: UsersRepository,
    },
    {
      provide: 'APP_FB_CONFIG',
      useValue: FB_CONFIG,
    },
    {
      provide: 'APP_FB_CONFIG_EDITED',
      useFactory: appConfigEdited,
      inject: [
        // only inject token in provider
        {
          token: 'APP_FB_CONFIG',
          optional: true,
        },
      ],
    },
    {
      provide: 'MY_LOGGER',
      useFactory: configLogger,
      inject: [
        {
          token: 'APP_NAME',
          optional: true,
        },
      ],
    },
  ],
})
export class UserModule {}
