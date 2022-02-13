import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({
    comment: '自增ID',
  })
  id: number;

  @Column({
    comment: '账户',
  })
  account: string;

  @Column({ comment: '密码' })
  password: string;
}
