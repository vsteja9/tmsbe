import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/models/task.entity';
import { UsersService } from 'src/users/users.service';
import { ProjectService } from 'src/project/project.service';
import { User } from 'src/models/user.entity';
import { Project } from 'src/models/project.entity';

@Module({
  controllers: [TaskController],
  imports: [TypeOrmModule.forFeature([Task, User, Project])],
  providers: [TaskService, UsersService, ProjectService],
  exports: [],
})
export class TaskModule {}
