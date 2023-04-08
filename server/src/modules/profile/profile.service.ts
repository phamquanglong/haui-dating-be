import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async getAll() {
    return await this.profileRepository.find();
  }

  async createProfile(body: any) {
    return await this.profileRepository.save({
      ...body,
    });
  }

  async updateProfile(profileId: number, body: any) {
    const profile = await this.profileRepository.findOneBy({ id: profileId });
    return await this.profileRepository.save({
      ...profile,
      ...body,
    });
  }
}
