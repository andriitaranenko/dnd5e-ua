import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Spell {

  @PrimaryGeneratedColumn()
  id: number;

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

  constructor(spell: Partial<Spell>) {
    Object.assign(this, spell);
  }
}
