import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('article')
export class Article {
  @PrimaryGeneratedColumn({
    comment: '自增ID',
  })
  id: number;

  @Column({
    comment: '标题',
  })
  title: string;

  @Column({
    comment: '内容',
  })
  content: string;

  @Column({
    comment: '标签',
  })
  tag: string;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_time',
    comment: '更新时间',
  })
  update_time: Date;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_time',
    comment: '创建时间',
  })
  created_time: Date;
}
