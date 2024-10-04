/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { AbstractLogger, LogLevel, LogMessage, QueryRunner } from 'typeorm';
import { SystemLogger } from '@app/libs/logger/system.logger';

@Injectable()
export class SqlLogger extends AbstractLogger {
  private logger: SystemLogger;
  constructor() {
    super();
    this.logger = new SystemLogger();
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.logger.debug('Query', {
      query,
      parameters,
    });
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: Record<string, unknown>[],
  ): void {
    this.logger.warn('Slow query detected', {
      'Time (ms)': time,
      query,
      parameters,
    });
  }

  /**
   * Write log to specific output.
   */
  protected writeLog(
    level: LogLevel,
    logMessage: LogMessage | LogMessage[],
    queryRunner?: QueryRunner,
  ) {
    const messages = this.prepareLogMessages(logMessage, {
      highlightSql: false,
    });
    for (const message of messages) {
      switch (message.type ?? level) {
        case 'log':
        case 'schema-build':
        case 'migration':
          this.logger.debug(message.message);
          break;

        case 'info':
        case 'query':
          if (message.prefix) {
            this.logger.debug(message.prefix, message.message);
          } else {
            this.logger.debug(message.message);
          }
          break;

        case 'warn':
        case 'query-slow':
          if (message.prefix) {
            this.logger.warn(message.prefix, message.message);
          } else {
            this.logger.warn(message.message);
          }
          break;

        case 'error':
        case 'query-error':
          if (message.prefix) {
            this.logger.error(message.prefix, message.message);
          } else {
            this.logger.error(message.message);
          }
          break;
      }
    }
  }
}
