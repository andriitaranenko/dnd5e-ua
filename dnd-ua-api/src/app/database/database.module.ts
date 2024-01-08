import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Spell } from '../spells/entities/spell.entity';
import { Class } from '../classes/entities/class.entity';
import { SpellClass } from '../spells/entities/spell-class.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('MYSQL_HOST'),
        port: +configService.getOrThrow('MYSQL_PORT'),
        database: configService.getOrThrow('MYSQL_DATABASE'),
        username: configService.getOrThrow('MYSQL_USERNAME'),
        password: configService.getOrThrow('MYSQL_PASSWORD'),
        entities: [Spell, Class],
        synchronize: true,
      }),
      inject: [ConfigService]
    })
  ]
})
export class DatabaseModule {}
