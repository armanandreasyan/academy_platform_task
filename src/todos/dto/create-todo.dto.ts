import { ApiProperty } from "@nestjs/swagger";

export class CreateTodoDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    completed: boolean;
}
