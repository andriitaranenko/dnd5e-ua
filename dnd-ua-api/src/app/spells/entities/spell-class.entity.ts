import { Entity } from "typeorm";

import { AbstractEntity } from "../../database/abstract.entity";

@Entity({ name: 'spell_class' })
export class SpellClass extends AbstractEntity<SpellClass> {}