import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSetting } from './user-settings.entity';

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectRepository(UserSetting)
    private userSettingRepository: Repository<UserSetting>,
  ) {}

  async getAll() {
    return await this.userSettingRepository.find({ relations: { user: true } });
  }

  async create(body: any) {
    return await this.userSettingRepository.save({
      ...body,
    });
  }

  async update(settingId: number, body: any) {
    const setting = await this.userSettingRepository.findOneBy({
      id: settingId,
    });
    return await this.userSettingRepository.save({
      ...setting,
      ...body,
    });
  }
}
