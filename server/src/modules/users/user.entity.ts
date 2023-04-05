import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserImage } from '../user-images/user-images.entity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  LGBT = 'lgbt',
}

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  fullName?: string;

  @Column({ type: 'enum', enum: Gender })
  gender?: Gender;

  @Column({ nullable: true })
  birthday?: Date;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  reputational?: number;

  @Column({ nullable: true })
  latitude?: number;

  @Column({ nullable: true })
  longitude?: number;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt?: Date;

  @OneToMany(() => UserImage, (userImage) => userImage.user)
  userImages: UserImage[];
}
