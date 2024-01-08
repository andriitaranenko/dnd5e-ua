import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { SpellsModule } from './spells/spells.module';
import { ClassesModule } from './classes/classes.module';
import { SeedService } from './database/seeder.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'dnd-ua-api/.env' }),
    DatabaseModule,
    SpellsModule,
    ClassesModule,
  ],
  controllers: [],
  providers: [SeedService],
})
export class AppModule {}
