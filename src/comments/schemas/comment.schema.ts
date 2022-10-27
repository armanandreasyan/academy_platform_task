import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    @Prop({ required: true })
    id: number;

    @Prop({ required: true })
    postId: number;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    body: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);