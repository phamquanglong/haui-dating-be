import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Conversation } from '../conversations/conversations.entity';
import { User } from '../users/user.entity';

@Entity('Message')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column({ default: false })
  isSeen: boolean;

  @Column({ nullable: true })
  userDelete: number;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.messages)
  sender: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;
}
