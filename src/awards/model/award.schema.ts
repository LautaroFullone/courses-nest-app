import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AwardDocument = HydratedDocument<Award>;

@Schema()
export class Award {

    @Prop()
    title: string;

    @Prop()
    description: string

    @Prop()
    idUser: mongoose.Types.ObjectId;
}

export const AwardSchema = SchemaFactory.createForClass(Award);