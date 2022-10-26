import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {GeoDocument, GeoSchema} from "./geo.schema";

export type AddressDocument = Address & Document;

@Schema()
export class Address {
    @Prop()
    street: string;

    @Prop()
    suite: string;

    @Prop()
    city: string;

    @Prop()
    zipcode: string;

    @Prop({ type: GeoSchema})
    geo: GeoDocument;
}

export const AddressSchema = SchemaFactory.createForClass(Address);