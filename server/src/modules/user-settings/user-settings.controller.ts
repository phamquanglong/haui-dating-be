import { Controller, Get } from '@nestjs/common';
import { UserSettingsService } from './user-settings.service';

@Controller('user-settings')
export class UserSettingsController {
  constructor(private userSettingService: UserSettingsService) {}

  @Get()
  getAll() {
    return this.userSettingService.getAll();
  }
}
