import { Expose, Transform } from 'class-transformer';

export class UserCreateResponse {
  @Expose()
  id!: string;

  @Expose()
  username!: string;

  @Expose()
  first_name: string;

  @Expose()
  last_name: string;

  @Transform(({ obj }) => `${obj.first_name} ${obj.last_name}`)
  @Expose()
  full_name: string;
}
