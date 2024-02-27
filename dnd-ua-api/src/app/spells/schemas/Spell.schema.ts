import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Spell {

  @Prop()
  originalName: string;
  
  @Prop()
  sourceUrl: string;
  
  @Prop()  
  translatedName: string;
  
  @Prop()
  level: number;
  
  @Prop()
  castingTime: string;

  @Prop()
  concentration: boolean;
  
  @Prop()
  range: number;
  
  @Prop([String])
  components: string[];
  
  @Prop()
  duration: number;
  
  @Prop()
  description: string;
  
  @Prop([String])
  spellUsers: string[];
}

export const SpellSchema = SchemaFactory.createForClass(Spell);
