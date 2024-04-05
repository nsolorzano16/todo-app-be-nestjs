import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todos } from './entities/todo.entity';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [TodosService],
  controllers: [TodosController],
  imports: [TypeOrmModule.forFeature([Todos]), AuthModule],
  exports: [TypeOrmModule, TodosService],
})
export class TodosModule {}
