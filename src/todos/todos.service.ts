import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todos } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateTodoDTO } from './dtos/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todos)
    private readonly todosRepository: Repository<Todos>,
  ) {}

  async create(createTodoDto: CreateTodoDto, user: User) {
    try {
      const todo = this.todosRepository.create({
        ...createTodoDto,
        user,
      });
      await this.todosRepository.save(todo);
      const { user: _, ...restTodo } = todo;
      return { ...restTodo };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async getAll(paginationDto: PaginationDto, user: User) {
    try {
      const { offset = 0, limit = 10 } = paginationDto;
      const todos = await this.todosRepository.find({
        take: limit,
        skip: offset,
        where: {
          user: {
            id: user.id,
          },
        },
      });
      return todos;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(id: string) {
    try {
      const todo = await this.todosRepository.findOneBy({ id });
      if (!todo) {
        throw new BadRequestException('Todo not found');
      }
      return todo;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async update(id: string, updateTodoDto: UpdateTodoDTO) {
    try {
      await this.todosRepository.update(id, {
        ...updateTodoDto,
        updatedAt: new Date(),
      });
      return await this.todosRepository.findOneBy({
        id,
      });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const todo = await this.findOne(id);
      await this.todosRepository.remove(todo);
      return todo;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
