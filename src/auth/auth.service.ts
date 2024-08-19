import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CreateUserDto } from 'users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { password, ...userDetails } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.create({
      ...userDetails,
      password: hashedPassword,
    });
    return newUser;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(
    userCredentials: { email: string; password: string },
    rememberMe: boolean,
  ) {
    const user = await this.validateUser(
      userCredentials.email,
      userCredentials.password,
    );
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }
    const payload: JwtPayload = { email: user.email, sub: user.id };
    const expiresIn = rememberMe ? '7d' : '1d';

    return {
      access_token: this.jwtService.sign(payload, { expiresIn }),
      user,
    };
  }

  async getUserFromToken(token: string) {
    try {
      const payload = this.jwtService.verify<JwtPayload>(token);
      const user = await this.usersService.findOneByEmail(payload.email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
