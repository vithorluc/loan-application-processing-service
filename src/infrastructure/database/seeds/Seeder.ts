
import { RoleSeederService } from "./Roles";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly roleSeederService: RoleSeederService,
  ) {}

  async seed(): Promise<void> {
    await this.roles()
      .then(() => {
        this.logger.debug('Successfuly completed seeding roles...');
      })
      .catch(error => {
        this.logger.error('Failed seeding roles...');
        throw error;
      });
  }

  async roles(): Promise<void> {
    return this.roleSeederService.seedRoles();
  }
}