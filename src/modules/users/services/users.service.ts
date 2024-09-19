import { Inject, Injectable } from '@nestjs/common';
import { UsersDto } from '../dto/users.dto';
import { SystemLogger } from 'src/modules/logger/services/system.logger';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @Inject('SYSTEM_LOGGER')
    private readonly logger: SystemLogger,
  ) {}
  async createUser(user: UsersDto): Promise<UsersDto> {
    const userClear = UsersDto.plainToClass(user);
    userClear.password = user.password;
    this.logger.info('userClear plainToClass', [userClear]);
    // const res: InsertResult = await this.usersRepository.save(userClear);
    return new UsersDto();
  }
}
