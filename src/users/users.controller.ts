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
// import { ModuleRef } from '@nestjs/core';
import { UsersService } from './services/users.service';
import { IFbConfig } from './interfaces/config.interface';

@Controller('users')
export class UsersController {
  //   constructor(private moduleRef: ModuleRef) {}
  constructor(
    private readonly usersService: UsersService,
    @Inject('APP_FB_CONFIG') private readonly fbConfig: IFbConfig,
    @Inject('APP_FB_CONFIG_EDITED') private readonly fbConfigEdited: IFbConfig,
  ) {
    console.log('fbConfig', fbConfig);
    console.log('fbConfigEdited', fbConfigEdited);
  }

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
  createUser(@Body() user: UsersDto): UsersDto {
    console.log('user from fe', user);
    // const userClear = this.moduleRef.get(UsersService).createUser(user);
    const result = UsersDto.plainToInstance(this.usersService.createUser(user));
    console.log('result', result);
    return result;
  }

  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return {
      id,
      username: 'truong',
      password: '123456',
    };
  }
}
