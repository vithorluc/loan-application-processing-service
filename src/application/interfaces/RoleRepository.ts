import { Role } from '../../domain/entities/Role';

export interface IRoleRepository {
  findById(id: string): Promise<Role | undefined>;
  findByName(name: string): Promise<Role | undefined>;
}