import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hobby } from './hobbies.entity';
import { HobbyRequestDto } from './hobby.dto';

@Injectable()
export class HobbiesService {
  constructor(
    @InjectRepository(Hobby) private hobbyRepository: Repository<Hobby>,
  ) {}

  async getAll() {
    return await this.hobbyRepository.find({
      relations: { userHobbies: true },
    });
  }
  async getHobbyById(id: number) {
    return await this.hobbyRepository.findOne({
      where: { id },
    });
  }

  async create(body: HobbyRequestDto) {
    return await this.hobbyRepository.save({
      ...body,
    });
  }
  async update(hobbyId: number, body: any) {
    const hobby = await this.getHobbyById(hobbyId);
    return await this.hobbyRepository.save({
      ...hobby,
      ...body,
    });
  }
}
