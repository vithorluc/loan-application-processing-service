import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/presentation/guards/auth.guard';
import { Application } from 'src/infrastructure/database/entities/Application';
import { Request } from '@nestjs/common';
import { ApplicationService } from 'src/application/services/ApplicationService';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @UseGuards(AuthGuard)
  async submitApplication(@Request() request): Promise<Application> {
    const userId = request.user.sub;
    return this.applicationService.submitApplication(userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getApplicationById(@Param('id') id: string): Promise<Application> {
    return this.applicationService.getApplicationById(id);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAllApplications(@Request() request): Promise<Application[]> {
    const userId = request.user.sub;
    return this.applicationService.getAllApplications(userId);
  }
}
