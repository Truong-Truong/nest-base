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
import { Storage } from '@app/libs/storage.lib';
import Cache from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly logger: SystemLogger,
    @Inject('USER_REPOSITORY')
    private readonly usersRepositoryNew: UsersRepository,
    @Inject('MY_STORAGE')
    private readonly myStorage: Storage,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
    const cacheKey = 'key_test_2';
    const value = await this.cacheManager.get(cacheKey);
    if (!value) {
      this.logger.error('------empty and set-------');
      await this.cacheManager.set(cacheKey, 'hello 123');
    } else {
      this.logger.error('-------exist------', value);
    }
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

  async uploadAvt(id: string, file: Express.Multer.File): Promise<boolean> {
    try {
      const disk = this.myStorage.cloud();
      await disk.write(`/${id}/${file.originalname}`, file.buffer);
    } catch (error) {
      this.logger.error('upload file failed', error);
      return false;
    }
    return true;
  }
}
