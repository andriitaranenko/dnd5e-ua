import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Spell } from "../../spells/entities/spell.entity";
import { AbstractEntity } from "../../database/abstract.entity";

@Entity()
export class Class extends AbstractEntity<Class> {

  @Column()
  name: string;

  @ManyToMany(() => Spell, spell => spell.classes)
  spells: Spell[];
}
