import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SystemLogger {
  private logger: Logger;
  constructor(context?: string) {
    this.logger = new Logger(context);
  }

  info(message: any, ...optionalParams: [...any, string?]): void {
    this.logger.log(message, optionalParams);
  }

  debug(message: any, ...optionalParams: [...any, string?]): void {
    this.logger.debug(message, optionalParams);
  }

  warn(message: any, ...optionalParams: [...any, string?]): void {
    this.logger.warn(message, optionalParams);
  }

  error(message: any, ...optionalParams: [...any, string?]): void {
    this.logger.error(message, optionalParams);
  }

  entry(func: string, ...optionalParams: [...any, string?]) {
    this.info(`entry: ${func}`, optionalParams);
  }

  exit(func: string, ...optionalParams: [...any, string?]) {
    this.info(`exit: ${func}`, optionalParams);
  }
}
