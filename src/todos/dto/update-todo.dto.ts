import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from "@nestjs/swagger";
import { CreateTodoDto } from './create-todo.dto';


export class UpdateTodoDto extends PartialType(CreateTodoDto) {
    @ApiProperty()
    completed: boolean;
}
