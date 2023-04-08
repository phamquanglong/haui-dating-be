import { Body, Controller, Get, Post } from '@nestjs/common';
import { HobbiesService } from './hobbies.service';
import { HobbyRequestDto } from './hobby.dto';

@Controller('hobbies')
export class HobbiesController {
  constructor(private hobbyService: HobbiesService) {}

  @Get()
  getAll() {
    return this.hobbyService.getAll();
  }

  @Post()
  createHobby(@Body() hobbyRequestDto: HobbyRequestDto) {
    return this.hobbyService.create(hobbyRequestDto);
  }
}
