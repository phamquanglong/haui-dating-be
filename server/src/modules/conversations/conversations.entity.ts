import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Conversation')
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userOne: number;

  @Column()
  userTwo: number;

  @Column()
  latestMessage: string;

  @Column()
  isActive?: boolean;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt?: Date;
}
