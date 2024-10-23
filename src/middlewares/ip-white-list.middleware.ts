import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class IpWhitelistMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  private readonly allowedIps: string[] = [
    '127.0.0.1',
    '10.17.18.116',
    'localhost',
  ];

  use(req: Request, res: Response, next: NextFunction) {
    // const clientIp = req.headers['x-forwarded-for'] || req.ip;

    const appEnv = this.configService.get<string>('app_env');
    if (appEnv == 'local') {
      return next();
    }
    const clientIp = req.ip;
    if (!this.allowedIps.includes(clientIp)) {
      throw new ForbiddenException(
        `IP ${clientIp} is not allowed to access this resource.`,
      );
    }
    return next();
  }
}
