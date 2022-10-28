import {Controller, Get, Post, Body, Patch, Param, Delete, HttpException} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}
  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    if (this.todosService.todoValidationCreate(createTodoDto)){
      throw new HttpException("All fields must be filled, incorrect types", 400);
    }
    return this.todosService.createTodo(createTodoDto);
  }

  @Get()
  getAllTodos() {
    return this.todosService.getAllTodos();
  }

  @Get('user/:userId')
  getTodosByUserId(@Param('userId') userId: string) {
    if (isNaN(+userId)){
      throw new HttpException("Type of params id must be a number.", 400)
    }
    return this.todosService.getTodosByUserId(+userId);
  }

  @Get(':id')
  getTodoById(@Param('id') id: string) {
    if (isNaN(+id)){
      throw new HttpException("Type of params id must be a number.", 400)
    }
    return this.todosService.getTodoByPropId(+id);
  }

  @Patch(':id')
  updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    if (isNaN(+id)){
      throw new HttpException("Type of params id must be a number.", 400)
    }
    if (this.todosService.todoValidationUpdate(updateTodoDto)){
      throw new HttpException("title, completed must be filled in with the correct types", 400);
    }
    return this.todosService.updateTodo(+id, updateTodoDto);
  }

  @Delete(':id')
  removeTodo(@Param('id') id: string) {
    if (isNaN(+id)){
      throw new HttpException("Type of params id must be a number.", 400)
    }
    return this.todosService.removeTodo(+id);
  }
}
