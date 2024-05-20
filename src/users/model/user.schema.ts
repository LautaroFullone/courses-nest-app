import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuid } from 'uuid'

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {

    //Mongo siempre crea un campo _id, pero aqui lo desacoplamos de la bd y lo creamos nosotros

    @Prop({ 
        unique: true, 
        default: uuid 
    })
    id: string

    @Prop({
        required: true
    })
    name: string;

    @Prop({ 
        required: true, 
        unique: true 
    })
    email: string;

    @Prop()
    password: string;

    @Prop({
        default: ['user']
     })
    roles: string[];

    @Prop()
    avatar: string

    @Prop()
    description: string
}

export const UserSchema = SchemaFactory.createForClass(User);