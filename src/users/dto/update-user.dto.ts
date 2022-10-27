import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from "@nestjs/swagger";
import { CreateUserDto } from './create-user.dto';
import { AddressDocument } from "../schemas/address.schema";
import { CompanyDocument } from "../schemas/company.schema";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    name: string;

    @ApiProperty()
    address: AddressDocument;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    website: string;

    @ApiProperty()
    company: CompanyDocument;
}
