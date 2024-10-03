import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { UserEntity } from '@app/entities/users.entity';
import { UserListRequest } from './requests/user-list.request';
import { Paginator } from '@app/libs/Paginator';

@Injectable()
export class UsersRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async findByConditions(
    query: UserListRequest,
    paginator: Paginator | null,
  ): Promise<any[]> {
    const queryBuilder = this.createQueryBuilder('user');
    if (query.keyword) {
      queryBuilder.where(
        '(user.first_name LIKE :keyword OR user.last_name LIKE :keyword)',
        { keyword: `%${query.keyword}%` },
      );
    }
    if (paginator != null) {
      queryBuilder.offset(paginator.offset).limit(paginator.limit);
      const totalRecords = await queryBuilder.getCount();
      paginator.totals = totalRecords;
    }

    const model = new UserEntity();
    console.log(query);
    if (query.sort_field && model.sortables().includes(query.sort_field)) {
      queryBuilder.orderBy(model.toOrderBy(query.sort_field, query.sort_dir));
    }
    const users = await queryBuilder.getMany();
    return users;
  }
}
