import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'orders',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    length: 30,
  })
  user_id: string;

  @Column({
    length: 50,
  })
  name: string;

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
