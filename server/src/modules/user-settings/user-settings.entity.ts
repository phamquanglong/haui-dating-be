import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  ALL = 'all',
}

@Entity('UserSetting')
export class UserSetting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  imageUrl: string;

  @Column('int', { array: true })
  distance: number[];

  @Column('int', { array: true })
  old: number[];

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt?: Date;
}
