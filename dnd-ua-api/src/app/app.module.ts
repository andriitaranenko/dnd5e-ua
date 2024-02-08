import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpellsModule } from './spells/spells.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/dnd_ua'),
    SpellsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
