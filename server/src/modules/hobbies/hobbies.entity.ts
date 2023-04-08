import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserHobbies } from '../user-hobbies/user-hobbies.entity';

@Entity('Hobby')
export class Hobby {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt?: Date;

  @OneToMany(() => UserHobbies, (userHobbies) => userHobbies.hobby)
  userHobbies: UserHobbies[];
}
