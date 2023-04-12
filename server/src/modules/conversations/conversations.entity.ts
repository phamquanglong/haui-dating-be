import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Message } from '../messages/messages.entity';
import { User } from '../users/user.entity';

@Entity('Conversation')
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  latestMessage?: string;

  @Column({ default: true })
  isActive?: boolean;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.conversationUserOne)
  userOne: User;

  @ManyToOne(() => User, (user) => user.conversationUserTwo)
  userTwo: User;

  @OneToMany(() => Message, (messages) => messages.sender)
  messages: Message[];
}
