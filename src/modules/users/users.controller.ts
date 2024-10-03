import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { SystemLogger } from '@app/shares/logger/system.logger';
import { LogEntry } from '@app/shares/log-entry.decorator';
import { UserCreateRequest } from './requests/user-create.request';
import { UserCreateResponse } from './responses/user-create.response';
import { Request } from 'express';
import { UserListRequest } from './requests/user-list.request';
import { Paginator } from '@app/libs/Paginator';
import { ConfigService } from '@nestjs/config';

@LogEntry()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: SystemLogger,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  async getAllUsers(@Req() request: Request): Promise<any> {
    const paginator: Paginator = new Paginator(this.configService, request);
    this.logger.debug('paginator', paginator);

    const query: UserListRequest = request.query;
    const data = await this.usersService.findByConditions(query, paginator);
    return {
      paginator,
      data,
    };
  }

  @Post()
  async createUser(
    @Body() user: UserCreateRequest,
  ): Promise<UserCreateResponse> {
    this.logger.info('user from fe', user);
    const result = await this.usersService.createUser(user);
    this.logger.info('result', [result]);
    return result;
  }

  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    this.logger.info(id);
    return {
      id,
      username: 'truong',
      password: '123456',
    };
  }
}
