import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class IpWhitelistGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  private readonly allowedIps: string[] = [
    '127.0.0.1',
    '10.17.18.116',
    'localhost',
  ];

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const appEnv = this.configService.get<string>('app_env');
    if (appEnv == 'local') {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    // const clientIp = request.headers['x-forwarded-for'] || request.ip;
    const clientIp = request.ip;
    console.log('IpWhitelistGuard clientIp', clientIp);
    if (!this.allowedIps.includes(clientIp)) {
      throw new ForbiddenException(`IP ${clientIp} is not allowed.`);
    }
    return true;
  }
}
