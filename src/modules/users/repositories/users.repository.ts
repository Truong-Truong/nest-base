import { UsersDto } from '../dto/users.dto';

export class UsersRepository {
  insertUser(userClear: UsersDto): UsersDto {
    userClear.id = 1;
    userClear.created_at = new Date();
    userClear.created_by = 1;
    return userClear;
  }
}
