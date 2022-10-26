import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Company} from "./company.schema";

export type GeoDocument = Geo & Document;

@Schema()
export class Geo {
    @Prop()
    lat: number;

    @Prop()
    lng: number;
}

export const GeoSchema = SchemaFactory.createForClass(Geo);