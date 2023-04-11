import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { UserActions } from '../user-actions/user-actions.entity';
import { UserHobbies } from '../user-hobbies/user-hobbies.entity';
import { UserImage } from '../user-images/user-images.entity';
import { UserSetting } from '../user-settings/user-settings.entity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  LGBT = 'lgbt',
}

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt?: Date;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToMany(() => UserImage, (userImage) => userImage.user)
  images: UserImage[];

  @OneToOne(() => UserSetting, (userSetting) => userSetting.user)
  settings: UserSetting;

  @OneToMany(() => UserHobbies, (userHobbies) => userHobbies.user)
  userHobbies: UserHobbies[];

  @OneToMany(() => UserActions, (userAction) => userAction.user)
  userActionUser: UserActions[];

  @OneToMany(() => UserHobbies, (userHobbies) => userHobbies.user)
  userActionTarget: UserActions[];
}
