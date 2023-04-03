import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async createAccessToken(
    userId: number,
  ): Promise<{ accessToken: string }> {
    console.log(userId);

    const accessToken = await this.jwtService.signAsync(
      { userId },
      { expiresIn: '30d', secret: 'secret' },
    );

    return { accessToken };
  }

  async register(registerDto: RegisterDto) {
    if (await this.userService.getUser({ userName: registerDto.userName }))
      throw new BadRequestException('Username already exists.');

    registerDto.password = bcrypt.hashSync(registerDto.password, 10);
    const createdUser = await this.userService.createUser(registerDto);

    return await this.createAccessToken(createdUser.id);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.getUser({
      userName: loginDto.userName,
    });

    if (!user)
      throw new BadRequestException('Incorrect user name or/and password.');

    if (!bcrypt.compareSync(loginDto.password, user.password))
      throw new BadRequestException('Incorrect user name or/and password.');

    return await this.createAccessToken(user.id);
  }
}
