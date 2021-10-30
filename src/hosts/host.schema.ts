import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Host extends Document {
    @Prop()
    name: string

    @Prop()
    url: string
}

export const HostSchema = SchemaFactory.createForClass(Host)
