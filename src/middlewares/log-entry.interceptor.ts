import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { LOG_ENTRY_KEY } from '@app/shares/log-entry.decorator';
import { SystemLogger } from '@app/libs/logger/system.logger';

@Injectable()
export class LogEntryInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private readonly logger: SystemLogger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const shouldLog: boolean =
      this.reflector.get<boolean>(LOG_ENTRY_KEY, context.getHandler()) ||
      this.reflector.get<boolean>(LOG_ENTRY_KEY, context.getClass());

    const startTime = Date.now();
    const request = context.switchToHttp().getRequest();
    const txt = `[${request.method}] ${request.url} ${context.getClass().name}::${context.getHandler().name}`;
    if (shouldLog) {
      this.logger.info(`---ENTRY--- ${txt}`);
    }

    return next.handle().pipe(
      tap(() => {
        // const response = context.switchToHttp().getResponse();
        if (shouldLog) {
          this.logger.info(`---EXIT--- ${txt}`, {
            time: Date.now() - startTime,
            unit: 'ms',
          });
        }
      }),
    );
  }
}
