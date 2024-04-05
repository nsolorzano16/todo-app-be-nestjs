import { IsBoolean } from 'class-validator';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDTO extends CreateTodoDto {
  @IsBoolean()
  completed: boolean;
}
