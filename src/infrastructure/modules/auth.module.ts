import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from 'src/application/services/authService';
import { UserRepositoryImpl } from '../database/repositories/UserRepositoryImpl';
import { User } from '../database/entities/User';
import { Role } from '../database/entities/Role';
import { Application } from '../database/entities/Application';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/presentation/controllers/auth/AuthController';
import { RoleRepositoryImpl } from '../database/repositories/RoleRepositoryImpl';

@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, Role, Application]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    JwtService,
    { provide: 'IUserRepository', useClass: UserRepositoryImpl },
    {
      provide: 'IRoleRepository',
      useClass: RoleRepositoryImpl,
    },
  ],
})
export class AuthModule {}
