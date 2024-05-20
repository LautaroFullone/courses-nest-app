import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { v4 as uuid } from 'uuid'

export type AwardDocument = HydratedDocument<Award>;

@Schema()
export class Award {

    @Prop({
        unique: true,
        default: uuid
    })
    id: string

    @Prop()
    title: string;

    @Prop()
    description: string

    @Prop()
    idUser: mongoose.Types.ObjectId;
}

export const AwardSchema = SchemaFactory.createForClass(Award);