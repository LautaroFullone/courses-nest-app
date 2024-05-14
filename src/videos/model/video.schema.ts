import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type VideoDocument = HydratedDocument<Video>;

@Schema({ timestamps: true })
export class Video {

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