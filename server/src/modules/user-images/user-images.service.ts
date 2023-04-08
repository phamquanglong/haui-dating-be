import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserImage } from './user-images.entity';

@Injectable()
export class UserImagesService {
  constructor(
    @InjectRepository(UserImage)
    private userImagesRepository: Repository<UserImage>,
  ) {}

  async getAll() {
    return await this.userImagesRepository.find({ relations: { user: true } });
  }

  async create(body: any) {
    return await this.userImagesRepository.save({
      ...body,
    });
  }

  async delete(userImageId: number) {
    return await this.userImagesRepository.delete({ id: userImageId });
  }
}
