import { DynamicModule } from '@nestjs/common';
import { SystemLogger } from './services/system.logger';
import { SqlLogger } from './services/sql.logger';

// @Module({})
export class LoggerModule {
  static register(logPrefix?: string): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: 'LOG_PREFIX',
          useValue: logPrefix,
        },
        {
          provide: 'SYSTEM_LOGGER',
          useFactory: (logPrefix: string) => new SystemLogger(logPrefix),
          inject: ['LOG_PREFIX'],
        },
        {
          provide: 'SQL_LOGGER',
          useFactory: (logPrefix: string) => new SqlLogger(logPrefix),
          inject: ['LOG_PREFIX'],
        },
      ],
      exports: ['SYSTEM_LOGGER', 'SQL_LOGGER'],
    };
  }
}
