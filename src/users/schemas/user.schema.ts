import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {AddressDocument, AddressSchema} from "./address.schema";
import {CompanyDocument, CompanySchema} from "./company.schema";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    id: number;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    email: string;

    @Prop({ type: AddressSchema })
    address: AddressDocument;

    @Prop()
    phone: string;

    @Prop()
    website: string;

    @Prop({ type: CompanySchema})
    company: CompanyDocument;
}

export const UserSchema = SchemaFactory.createForClass(User);