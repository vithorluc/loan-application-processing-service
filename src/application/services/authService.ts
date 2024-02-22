import { Inject, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../dtos/RegisterDto';
import { LoginDto } from '../dtos/LoginDto';
import { IUserRepository } from '../interfaces/UserRepository';
import { User } from 'src/domain/entities/User';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { IRoleRepository } from '../interfaces/RoleRepository';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('IRoleRepository') private readonly roleRepository: IRoleRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}


  async register(registerDto: RegisterDto): Promise<User> {
    const { email, password, username } = registerDto

    const existingUser = await this.userRepository.findByEmail(email);
    
    if (existingUser) {
      throw new UnauthorizedException('Email is already in use');
    }

    const role = await this.roleRepository.findByName('Applicant');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.createUser({ username, email, password: hashedPassword, role });
    if (!newUser) {
      throw new UnauthorizedException('Failed to create user');
    }
    
    delete newUser.password

    return newUser
  }

  async login(loginDto: LoginDto): Promise<{ user: User, token: string }> {
    const { email, password } = loginDto

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const secretKey = this.configService.get<string>('JWT_SECRET');

    const payload = { username: user.username, sub: user.id };

    const token = this.jwtService.sign(payload, { secret: secretKey });

    delete user.password

    return { user, token };
  }
}
