import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from 'src/infrastructure/database/entities/Application';
import { Repository } from 'typeorm';
import { User } from '../entities/User';

@Injectable()
export class ApplicationRepositoryImpl {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
  ) {}

  async submitApplication(user: User): Promise<Application> {
    const application = this.applicationRepository.create({
      applicant_id: { id: user.id }, 
    });
  
    return this.applicationRepository.save(application);
  }

  async getApplicationById(id: string): Promise<Application> {
    const application = await this.applicationRepository.findOne({ where: { id } });
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return application;
  }

  async getAllApplications(): Promise<Application[]> {
    return this.applicationRepository.find();
  }
}
