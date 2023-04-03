import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/auth.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAll() {
    return await this.usersRepository.find();
  }

  async getUser(obj: { id?: number; userName?: string }) {
    return await this.usersRepository.findOneBy(obj);
  }

  async createUser(body: RegisterDto) {
    return await this.usersRepository.save({
      ...body,
    });
  }
}
