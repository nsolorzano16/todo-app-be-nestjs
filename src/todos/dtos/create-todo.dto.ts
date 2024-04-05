import { IsIn, IsString, MinLength } from 'class-validator';
import { TodosPriorityEnum } from '../enums';

export class CreateTodoDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(3)
  description: string;

  @IsString()
  @IsIn(['LOW', 'MEDIUM', 'HIGH'])
  priority: TodosPriorityEnum;
}
