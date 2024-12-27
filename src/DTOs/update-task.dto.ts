import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { TaskStatus } from 'src/models/task.entity';
import { TaskDTO } from './task.dto';

export class UpdateTaskDTO extends TaskDTO {
  @ApiProperty()
  @IsNotEmpty()
  status: TaskStatus;
}
