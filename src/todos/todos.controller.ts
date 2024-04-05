import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateTodoDTO } from './dtos/update-todo.dto';

@Controller('todos')
@Auth()
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @GetUser() user: User) {
    return this.todosService.create(createTodoDto, user);
  }

  @Get()
  getAll(@Query() paginationDto: PaginationDto, @GetUser() user: User) {
    return this.todosService.getAll(paginationDto, user);
  }

  @Patch()
  update(@Body() updateTodoDto: UpdateTodoDTO, @Query('id') id: string) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete()
  delete(@Query('id') id: string) {
    return this.todosService.remove(id);
  }
}
