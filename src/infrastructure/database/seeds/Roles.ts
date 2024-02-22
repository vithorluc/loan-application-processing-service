import { Repository } from "typeorm";
import { Role, RoleTypes } from "../entities/Role";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RoleSeederService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async seedRoles(): Promise<void> {
    const adminRole = new Role();
    adminRole.name = RoleTypes.Admin;

    const applicantRole = new Role();
    applicantRole.name = RoleTypes.Applicant;

    await this.roleRepository.save([adminRole, applicantRole]);
  }
}