import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HobbiesService } from '../hobbies/hobbies.service';
import { User } from '../users/user.entity';
import { UserHobbies } from './user-hobbies.entity';

@Injectable()
export class UserHobbiesService {
  constructor(
    @InjectRepository(UserHobbies)
    private userHobbiesRepository: Repository<UserHobbies>,
    private hobbiesService: HobbiesService,
  ) {}

  async getAll() {
    return await this.userHobbiesRepository.find({
      relations: { user: true, hobby: true },
    });
  }

  async create(user: User, hobbyId: number) {
    const hobby = await this.hobbiesService.getHobbyById(hobbyId);
    delete user.profile;
    delete user.userHobbies;
    delete user.images;
    delete user.settings;

    const newUserHobbies = await this.userHobbiesRepository.save({});
    newUserHobbies.hobby = hobby;
    newUserHobbies.user = user;
    await this.userHobbiesRepository.save(newUserHobbies);

    return newUserHobbies;
  }

  async delete(userHobbiesId: number) {
    return await this.userHobbiesRepository.delete({ id: userHobbiesId });
  }
}
