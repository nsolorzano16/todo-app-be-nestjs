import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TodosPriorityEnum } from '../enums';
import { User } from 'src/auth/entities/user.entity';

@Entity({ name: 'todos' })
export class Todos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  title: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'bool',
    default: false,
  })
  completed: boolean;

  @Column({
    type: 'enum',
    enum: TodosPriorityEnum,
    default: TodosPriorityEnum.LOW,
  })
  priority: TodosPriorityEnum;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
