import { Exclude, Expose, Transform } from 'class-transformer';
import { IsNotEmpty, Length } from 'class-validator';
import { BaseDto } from 'src/common/base.dto';

export class UsersDto extends BaseDto {
  @IsNotEmpty()
  @Expose()
  username!: string;

  @IsNotEmpty()
  @Length(6)
  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  @IsNotEmpty()
  @Length(1, 10)
  @Expose()
  firstName: string;

  @Length(1, 10)
  @IsNotEmpty()
  @Expose()
  lastName: string;

  @Transform(({ obj }) => `${obj.firstName} ${obj.lastName}`)
  @Exclude({
    toClassOnly: true,
  })
  fullName: string;
}
