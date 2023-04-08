import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Hobby } from '../hobbies/hobbies.entity';
import { User } from '../users/user.entity';

@Entity('UserHobbies')
export class UserHobbies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt?: Date;

  @ManyToOne(() => Hobby, (hobby) => hobby.userHobbies)
  hobby: Hobby;

  @ManyToOne(() => User, (user) => user.userHobbies)
  user: User;
}
