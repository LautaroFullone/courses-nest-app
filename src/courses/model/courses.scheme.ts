import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {

    @Prop({ required: true })
    name: string;

    @Prop()
    price: number;

    @Prop()
    description: string

    @Prop()
    cover: string

    @Prop()
    idAuthor: mongoose.Types.ObjectId;
}

export const CourseSchema = SchemaFactory.createForClass(Course);