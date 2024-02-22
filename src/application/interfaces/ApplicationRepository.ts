import { User } from 'src/domain/entities/User';
import { Application } from 'src/infrastructure/database/entities/Application';

export interface IApplicationRepository {
  findById(id: string): Promise<Application | undefined>;
  submitApplication(user: User): Promise<Application | undefined>;
  getApplicationById(id: string): Promise<Application | undefined>;
  getAllApplications(): Promise<Application[] | undefined>;
}