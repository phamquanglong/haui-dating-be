import { Controller, Get } from '@nestjs/common';
import { UserHobbiesService } from './user-hobbies.service';

@Controller('user-hobbies')
export class UserHobbiesController {
  constructor(private userHobbiesService: UserHobbiesService) {}

  @Get()
  getAll() {
    return this.userHobbiesService.getAll();
  }
}
