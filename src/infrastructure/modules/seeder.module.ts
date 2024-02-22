import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
import { Seeder } from '../database/seeds/Seeder';
import { RoleSeederService } from '../database/seeds/Roles';
import { Role } from '../database/entities/Role';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
  ],
  providers: [Seeder, Logger, RoleSeederService],
  exports: [Seeder],
})
export class SeederModule {}
