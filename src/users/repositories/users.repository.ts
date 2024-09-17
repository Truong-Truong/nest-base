import { UsersDto } from '../dto/users.dto';

export class UsersRepository {
  insertUser(userClear: UsersDto): UsersDto {
    console.log('insert user', userClear);
    return userClear;
  }
}
