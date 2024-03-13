import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { hash } from 'bcrypt';

import { Roles } from 'dnd-ua-api/src/app/auth/models/auth.model';
import { Character } from 'dnd-ua-api/src/app/characters/schemas/Character.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ type: String, enum: Roles, isRequired: false, default: Roles.USER })
  role?: Roles;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Character', default: [] })
  characters: Character[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function (next: Function) {
  this.password = await hash(this.password, 10);
  next();
});
