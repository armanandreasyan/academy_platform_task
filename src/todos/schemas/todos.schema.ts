import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
    @Prop({ required: true })
    id: number;

    @Prop({ required: true })
    userId: number;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true, default: false })
    completed: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);