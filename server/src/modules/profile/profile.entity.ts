import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  LGBT = 'lgbt',
}

@Entity('Profile')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column()
  birthday: string;

  @Column()
  bio: string;

  @Column()
  reputational: number;

  @Column()
  latitude: number;

  @Column()
  longitude?: number;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt?: Date;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;
}
