import { Inject, Injectable, Logger } from '@nestjs/common';
import { UsersDto } from '../dto/users.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly usersRepository: UsersRepository,
    @Inject('MY_LOGGER')
    private readonly logger: Logger,
  ) {}
  createUser(user: UsersDto): UsersDto {
    const userClear = UsersDto.plainToClass(user);
    this.logger.log('userClear plainToClass', [userClear]);
    return this.usersRepository.insertUser(userClear);
  }
}
