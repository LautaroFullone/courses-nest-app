import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { v4 as uuid } from 'uuid'

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {

    @Prop({
        unique: true,
        default: uuid
    })
    id: string

    @Prop({ required: true })
    title: string;

    @Prop()
    price: number;

    @Prop()
    description: string

    @Prop()
    cover: string

    @Prop({ required: true })
    idAuthor: string
    // idAuthor: mongoose.Types.ObjectId;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

CourseSchema.statics.findAllCourses = function(){
    const coursesList = this.aggregate(
        [
            {
                $lookup: {
                    from: 'users',
                    foreignField: 'id',
                    localField: 'idAuthor',
                    as: 'miAutor',
                    pipeline: [ //dentro de usuarios
                        {
                            $project: { //campos que deseo de retorne
                                _id: 0, //_id siempre lo muestra asiq lo sacamos
                                name: 1,
                                email: 1
                            }
                        }
                    ]
                }
            },
            {
                $unwind: '$miAutor' //hace que el autor no venga dentro de un array
            }
        ]
    )
    return coursesList;
}