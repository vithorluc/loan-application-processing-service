import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";
import { Seeder } from 'src/infrastructure/database/seeds/Seeder';
import { MainModule } from 'src/infrastructure/modules/main.module';

export async function createNestApp() {
  const expressAdapter = new ExpressAdapter();
  const app = await NestFactory.create<NestExpressApplication>(MainModule, expressAdapter, {
    cors: true
  });

  const seeder = app.select(MainModule).get(Seeder);

  await seeder.seed();

  return app;
}