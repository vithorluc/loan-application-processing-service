import { Module } from '@nestjs/common';
import { ApplicationService } from '../../application/services/ApplicationService';
import { ApplicationController } from '../../presentation/controllers/application/ApplicationController';
import { ApplicationRepositoryImpl } from '../database/repositories/ApplicationRepositoryImpl';
import { UserRepositoryImpl } from '../database/repositories/UserRepositoryImpl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from '../database/entities/Application';
import { Role } from '../database/entities/Role';
import { User } from '../database/entities/User';
import { JwtService } from '@nestjs/jwt';
import { RoleRepositoryImpl } from '../database/repositories/RoleRepositoryImpl';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Application])],
  controllers: [ApplicationController],
  providers: [
    ApplicationService,
    JwtService,
    {
      provide: 'IApplicationRepository',
      useClass: ApplicationRepositoryImpl,
    },
    {
      provide: 'IRoleRepository',
      useClass: RoleRepositoryImpl,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepositoryImpl,
    },
  ],
})
export class ApplicantModule {}
