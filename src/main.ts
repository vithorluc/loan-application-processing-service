import { createNestApp } from 'app.factory';

async function bootstrap() {
  const app = await createNestApp();
  await app.listen(3000);
}

bootstrap();
