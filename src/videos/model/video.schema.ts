import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { v4 as uuid } from 'uuid'

export type VideoDocument = HydratedDocument<Video>;

@Schema({ timestamps: true })
export class Video {

    @Prop({
        unique: true,
        default: uuid
    })
    id: string

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    source: string;

    @Prop()
    score: number;

    @Prop()
    idCourse: mongoose.Types.ObjectId;
}

export const VideoSchema = SchemaFactory.createForClass(Video);