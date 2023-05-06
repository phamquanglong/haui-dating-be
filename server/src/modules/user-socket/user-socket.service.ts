import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserSocket } from './user-socket.entity';

@Injectable()
export class UserSocketService {
  constructor(
    @InjectRepository(UserSocket)
    private userSocketRepository: Repository<UserSocket>,
  ) {}

  async getAll() {
    return await this.userSocketRepository.find();
  }

  async deleteAll() {
    return await this.userSocketRepository.clear();
  }

  async create(userId: number, socketId: string) {
    const isExist = await this.userSocketRepository.findOneBy({ userId });
    if (isExist) await this.userSocketRepository.delete({ userId });
    return await this.userSocketRepository.save({ userId, socketId });
  }

  async delete(socketId: string) {
    return await this.userSocketRepository.delete({ socketId });
  }

  async findSocketsByUserIds(userIds: number[]) {
    return this.userSocketRepository.find({ where: { userId: In(userIds) } });
  }
}
