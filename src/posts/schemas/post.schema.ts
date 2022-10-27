import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type PostDocument = Post & Document;

@Schema()
export class Post {
    @Prop({ required: true })
    id: number;

    @Prop({ required: true })
    userId: number;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    body: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);