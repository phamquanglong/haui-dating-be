import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('enum', { nullable: true })
  gender?: 'male' | 'female' | 'lgbt';

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
}
