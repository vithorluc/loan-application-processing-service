import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Application } from 'src/infrastructure/database/entities/Application';
import { IUserRepository } from '../interfaces/UserRepository';
import { IApplicationRepository } from '../interfaces/ApplicationRepository';
import { IRoleRepository } from '../interfaces/RoleRepository';

@Injectable()
export class ApplicationService {
  constructor(
    @Inject('IApplicationRepository') private readonly applicationRepository: IApplicationRepository,
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('IRoleRepository') private readonly roleRepository: IRoleRepository,
  ) {}

  async submitApplication(userId: string): Promise<Application> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }

    return this.applicationRepository.submitApplication(user);
  }

  async getApplicationById(id: string): Promise<Application> {
    const application = await this.applicationRepository.getApplicationById(id);

    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }

    return application;
  }

  async getAllApplications(userId: string): Promise<Application[]> {
    const user = await this.userRepository.findById(userId);

    const role = await this.roleRepository.findByName('Admin')

    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }
    
    if (role.id !== user.role.id) {
        throw new UnauthorizedException('Permission Denied');
    }

    return this.applicationRepository.getAllApplications();
  }
}
