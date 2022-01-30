import { Column, Entity, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('moments')
export class Moments {
    @PrimaryGeneratedColumn({
        comment: '自增ID'
    })
    id: number;

    @Column({
        comment: '内容'
    })
    content: string;

    @Column({
        comment: '链接'
    })
    share_url: string;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'time',
    })
    update_time: Date;
}