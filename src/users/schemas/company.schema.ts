import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
    @Prop()
    name: string;

    @Prop()
    catchPhrase: string;

    @Prop()
    bs: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);