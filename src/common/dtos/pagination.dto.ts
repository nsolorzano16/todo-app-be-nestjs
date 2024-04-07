import { Type } from 'class-transformer';
import { IsIn, IsOptional, IsPositive, Min } from 'class-validator';
import { TodosPriorityEnum } from 'src/todos/enums';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;

  @IsOptional()
  @IsIn(['LOW', 'MEDIUM', 'HIGH', 'ALL'])
  @Type(() => String)
  priority: TodosPriorityEnum;
}
