import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

export class Paginator {
  constructor(configService: ConfigService, request: Request) {
    let limit: any =
      request.query.limit || configService.get<number>('app_pagination_limit');
    limit = Math.min(limit, Paginator.MaxRecord); // Max 1000 record
    let page: any = request.query.page || 1;
    page = Math.max(page, 1); // Make sure NO 0 page
    const offset = (page - 1) * limit;
    this.limit = limit;
    this.page = page;
    this.offset = offset;
  }
  static MaxRecord: number = 1000;
  public limit: number = 0;
  public page: number = 0;
  public offset: number = 0;
  public totals: number = 0;
}
