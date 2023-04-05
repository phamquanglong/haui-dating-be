import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Action {
  LIKE = 'like',
  DISLIKE = 'dislike',
}

@Entity('UserActions')
export class UserActions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  targetId: number;

  @Column({ type: 'enum', enum: Action })
  action: Action;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt?: Date;
}
