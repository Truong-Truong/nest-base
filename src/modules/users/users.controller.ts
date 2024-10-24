import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { SystemLogger } from '@app/libs/logger/system.logger';
import { LogEntry } from '@app/shares/log-entry.decorator';
import { UserCreateRequest } from './requests/user-create.request';
import { UserCreateResponse } from './responses/user-create.response';
import { Request } from 'express';
import { UserListRequest } from './requests/user-list.request';
import { Paginator } from '@app/libs/paginator.lib';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';

// @UseGuards(IpWhitelistGuard)
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
    const result = await this.usersService.createUser(user);
    return result;
  }

  @Post('/:id/upload-avt')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvt(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 50000 }),
          new FileTypeValidator({ fileType: /image\/(jpeg|png)/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<boolean> {
    return this.usersService.uploadAvt(id, file);
  }

  @Get('/:id')
  getUser(@Param('id', ParseUUIDPipe) id: number) {
    this.logger.info(id);
    return {
      id,
      username: 'truong',
      password: '123456',
    };
  }
}
