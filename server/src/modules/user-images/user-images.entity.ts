import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UserImage')
export class UserImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  imageUrl: string;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt?: Date;
}
