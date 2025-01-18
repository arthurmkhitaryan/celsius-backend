import { Controller, Post, Body, Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const rememberMe = loginDto.rememberMe;
    return this.authService.login(loginDto, rememberMe);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    console.log({ mtav: true });
    return this.authService.register(createUserDto);
  }

  @Get('me')
  async getProfile(@Headers('authorization') authHeader: string) {
    console.log({ authHeader });
    const token = authHeader.split(' ')[1];
    return this.authService.getUserFromToken(token);
  }
}
