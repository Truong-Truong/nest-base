import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersDto } from './dto/users.dto';
import { UsersService } from './services/users.service';
import { SystemLogger } from '../logger/services/system.logger';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject('SYSTEM_LOGGER')
    private readonly logger: SystemLogger,
  ) {}

  @Get()
  getAllUsers() {
    return [
      {
        id: 1,
        name: 'truong',
        age: 27,
      },
      {
        id: 2,
        name: 'tam',
        age: 26,
      },
    ];
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async createUser(@Body() user: UsersDto): Promise<any> {
    this.logger.info('user from fe', user);
    // const userClear = this.moduleRef.get(UsersService).createUser(user);
    // const result = UsersDto.plainToClass(this.usersService.createUser(user));
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
