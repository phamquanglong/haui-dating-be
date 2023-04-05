import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Message')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  conversationId: number;

  @Column()
  isSeen: boolean;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt?: Date;
}
