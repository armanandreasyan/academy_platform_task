import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from "./schemas/todos.schema";


@Injectable()
export class TodosService {
  constructor(
      @InjectModel(Todo.name) private todoModel: Model<TodoDocument>,
  ) {}
  todoValidationCreate(todo: CreateTodoDto) : boolean{
    const { id, userId, title, completed } = todo;
    if (!id || !userId || !title || !completed){
      return true;
    }
    return isNaN(+id) || isNaN(+userId) || typeof title !== "string" || typeof completed !== "boolean";
  }
  todoValidationUpdate(todo: UpdateTodoDto) : boolean{
    const { title, completed } = todo;
    if (!title || !completed){
      return true;
    }
    return typeof title !== "string" || typeof completed !== "boolean";
  }

  createTodo(createTodoDto: CreateTodoDto) {
    const createdTodo = new this.todoModel(createTodoDto);
    return createdTodo.save();
  }

  getAllTodos(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  getTodosByUserId(userId: number){
    return this.todoModel.find({ userId })
  }

  getTodoByPropId(id: number) {
    return this.todoModel.findOne({ id }).exec();
  }

  updateTodo(id: number, updateTodoDto: UpdateTodoDto) {
    return this.todoModel.findOneAndUpdate({ id }, updateTodoDto);
  }

  removeTodo(id: number) {
    return this.todoModel.findOneAndDelete({ id });
  }
}
