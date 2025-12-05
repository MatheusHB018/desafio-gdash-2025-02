import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Hook para criptografar a senha antes de salvar
UserSchema.pre<UserDocument>('save', async function (next) {
  // 'this' se refere ao documento que está sendo salvo
  if (this.isModified('password')) {
    // Se a senha já estiver em formato bcrypt (ex: começa com $2b$), não re-hash
    if (typeof this.password === 'string' && /^\$2[abxy]\$/.test(this.password)) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});