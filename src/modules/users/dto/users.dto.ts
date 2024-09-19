import { Exclude, Expose, Transform } from 'class-transformer';
import { IsNotEmpty, Length } from 'class-validator';
import { BaseDto } from 'src/shares/base.dto';

export class UsersDto extends BaseDto {
  @Expose()
  id: number;

  @IsNotEmpty()
  @Length(1, 50)
  @Expose()
  username!: string;

  @IsNotEmpty()
  @Length(6)
  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  @IsNotEmpty()
  @Length(1, 50)
  @Expose()
  first_name: string;

  @IsNotEmpty()
  @Length(1, 50)
  @Expose()
  last_name: string;

  @Transform(({ obj }) => `${obj.firstName} ${obj.lastName}`)
  @Exclude({
    toClassOnly: true,
  })
  full_name: string;

  @Expose()
  is_active: boolean;
}
