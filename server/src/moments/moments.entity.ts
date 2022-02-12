import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('moments')
export class Moments {
  @PrimaryGeneratedColumn({
    comment: '自增ID',
  })
  id: number;

  @Column({
    comment: '内容',
  })
  content: string;

  @Column({
    comment: '链接',
  })
  share_url: string;

  @Column({
    comment: '图片',
  })
  img_url: string;

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
