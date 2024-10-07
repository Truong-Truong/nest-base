import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'users',
  orderBy: {
    username: 'ASC',
  },
})
export class UserEntity extends BaseEntity {
  protected sortFields: string[] = ['id', 'username'];

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
  })
  username: string;

  @Column()
  password: string;

  @Column({
    length: 50,
  })
  first_name: string;

  @Column({
    length: 50,
  })
  last_name: string;

  @Column({
    default: 0,
  })
  is_active: boolean;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at!: Date;

  @Column({ nullable: true })
  created_by!: number;

  @Column({ nullable: true })
  updated_by!: number;
}
