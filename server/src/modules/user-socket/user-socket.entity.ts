import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UserSocket')
export class UserSocket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  socketId: string;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt?: Date;
}
