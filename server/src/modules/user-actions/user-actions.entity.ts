import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

export enum Action {
  LIKE = 'like',
  DISLIKE = 'dislike',
}

@Entity('UserActions')
export class UserActions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Action })
  action: Action;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.userActionUser)
  user: User;

  @ManyToOne(() => User, (user) => user.userActionTarget)
  targetUser: User;
}
