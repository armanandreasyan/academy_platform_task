import { ApiProperty } from '@nestjs/swagger';
import {AddressDocument} from "../schemas/address.schema";
import {CompanyDocument} from "../schemas/company.schema";

export class CreateUserDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    address: AddressDocument;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    website: string;

    @ApiProperty()
    company: CompanyDocument;
}
