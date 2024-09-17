import { Expose, plainToClass, plainToInstance } from 'class-transformer';

export abstract class BaseDto {
  @Expose()
  id: number;

  @Expose()
  created_at: Date;

  @Expose()
  created_by: number;

  @Expose()
  updated_at: Date;

  @Expose()
  updated_by: number;

  @Expose()
  deleted_at: Date;

  static plainToClass<T>(this: new (...args: any[]) => T, obj: T): T {
    return plainToClass(this, obj, { excludeExtraneousValues: true });
  }

  static plainToInstance<T>(this: new (...args: any[]) => T, obj: T): T {
    return plainToInstance(this, obj);
  }
}
