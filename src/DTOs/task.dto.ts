import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Project } from 'src/models/project.entity';
import { TaskStatus } from 'src/models/task.entity';
import { User } from 'src/models/user.entity';

export class TaskDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  taskName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  taskDescription: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  projectId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  userId: string;
 
}
