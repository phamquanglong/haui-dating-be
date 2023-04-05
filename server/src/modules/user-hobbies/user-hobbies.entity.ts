import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UserHobbies')
export class UserHobbies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  hobbyId: number;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt?: Date;
}
