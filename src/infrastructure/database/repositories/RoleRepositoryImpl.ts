import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, RoleType } from '../../../domain/entities/Role';
import { IRoleRepository } from '../../../application/interfaces/RoleRepository';

@Injectable()
export class RoleRepositoryImpl implements IRoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findById(id: string): Promise<Role | undefined> {
    return this.roleRepository.findOne({ where: { id }});
  }

  async findByName(name: RoleType): Promise<Role | undefined> {
    return this.roleRepository.findOne({ where: { name } });
  }
}
