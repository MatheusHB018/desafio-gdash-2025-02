import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WeatherLogDocument = WeatherLog & Document;

@Schema()
export class WeatherLog {
  @Prop()
  city: string;

  @Prop()
  temperature: number;

  @Prop()
  condition: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const WeatherLogSchema = SchemaFactory.createForClass(WeatherLog);