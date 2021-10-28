import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, ObjectId } from 'mongoose'

@Schema()
export class User extends Document {
    _id: ObjectId

    @Prop()
    username: string

    @Prop()
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
