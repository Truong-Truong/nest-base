import { IsNotEmpty, Length } from 'class-validator';

export class UserCreateRequest {
  @IsNotEmpty()
  @Length(1, 50)
  username!: string;

  @IsNotEmpty()
  @Length(6)
  password: string;

  @IsNotEmpty()
  @Length(1, 50)
  first_name: string;

  @IsNotEmpty()
  @Length(1, 50)
  last_name: string;
}
