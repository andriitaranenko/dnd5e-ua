import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

import { AbstractEntity } from "../../database/abstract.entity";
import { Class } from "../../classes/entities/class.entity";

@Entity()
export class Spell extends AbstractEntity<Spell> {

  @Column()
  originalName: string;

  @Column()
  resource: string;

  @Column()
  translatedName: string;

  @Column({ default: 0 })
  level: number;

  @Column({ type: 'longtext' })
  description: string;

  @ManyToMany(() => Class, classEntity => classEntity.spells)
  @JoinTable({
    name: 'spell_class',
    joinColumn: {
      name: 'spell_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'spell_classes_class_spell_id'
    },
    inverseJoinColumn: {
      name: 'class_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'spell_classes_class_class_id'
    }
  })
  classes: Class[];
}
