import {  Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from '../database/config/typeorm';
import { AuthModule } from './auth.module';
import { ApplicantModule } from './applicant.module';
import { SeederModule } from './seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    AuthModule,
    ApplicantModule,
    SeederModule,
  ],
})
export class MainModule { }
