import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UserSetting')
export class UserSetting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  imageUrl: string;

  @Column()
  distance: number[];

  @Column()
  ole: number[];

  @Column('enum')
  gender: 'male' | 'female' | 'all';

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt?: Date;
}
