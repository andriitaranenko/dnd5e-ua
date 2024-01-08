import { NestFactory } from "@nestjs/core";
import { AppModule } from "../src/app/app.module";
import { SeedService } from "../src/app/database/seeder.service";



const bootstrap = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(SeedService);

  await seedService.seed();
  await app.close();

  console.log("Seed complete.");
}

bootstrap();