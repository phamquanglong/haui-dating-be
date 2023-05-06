import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSocket } from './user-socket.entity';
import { UserSocketService } from './user-socket.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserSocket])],
  providers: [UserSocketService],
  exports: [UserSocketService],
})
export class UserSocketModule {}
