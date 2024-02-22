import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from 'src/application/dtos/LoginDto';
import { RegisterDto } from 'src/application/dtos/RegisterDto';
import { AuthService } from 'src/application/services/authService';
import { User } from 'src/domain/entities/User';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    return await this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
}