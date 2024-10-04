import { Inject, Injectable } from '@nestjs/common';
import { SystemLogger } from '@app/libs/logger/system.logger';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@app/entities/users.entity';
import { UsersRepository } from '@users/users.repository';
import { Repository } from 'typeorm';
import { UserCreateRequest } from './requests/user-create.request';
import { UserCreateResponse } from './responses/user-create.response';
import { plainToClass } from 'class-transformer';
import { UserListRequest } from './requests/user-list.request';
import { Paginator } from '@app/libs/paginator.lib';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly logger: SystemLogger,
    @Inject('USER_REPOSITORY')
    private readonly usersRepositoryNew: UsersRepository,
  ) {}

  async createUser(user: UserCreateRequest): Promise<UserCreateResponse> {
    user.password = user.password; // hash todo
    const res = await this.usersRepositoryNew.save(user);
    return plainToClass(UserCreateResponse, res, {
      excludeExtraneousValues: true,
    });
  }

  async findByConditions(
    query: UserListRequest,
    paginator: Paginator | null,
  ): Promise<UserCreateResponse[]> {
    const users = await this.usersRepositoryNew.findByConditions(
      query,
      paginator,
    );
    return (
      users?.map((item) =>
        plainToClass(UserCreateResponse, item, {
          excludeExtraneousValues: true,
        }),
      ) ?? []
    );
  }
}
