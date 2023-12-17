import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { SpellsModule } from './spells/spells.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    SpellsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
