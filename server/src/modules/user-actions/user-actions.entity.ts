import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UserActions')
export class UserActions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  targetId: number;

  @Column('enum')
  action: 'like' | 'dislike';

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt?: Date;
}
