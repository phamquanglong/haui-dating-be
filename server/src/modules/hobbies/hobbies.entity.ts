import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Hobby')
export class Hobby {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imgUrl: string;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt?: Date;
}
