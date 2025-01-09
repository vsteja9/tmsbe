import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TaskDTO } from 'src/DTOs/task.dto';
import { TaskService } from './task.service';
import { UpdateTaskDTO } from 'src/DTOs/update-task.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/userauth.guard';

@Controller('tasks')
@ApiBearerAuth()
@UseGuards(UserAuthGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Post('/create')
  create(@Body() task: TaskDTO) {
    return this.taskService.createTask(task);
  }
  @Get('/all')
  getAll() {
    return this.taskService.GetAllTasks();
  }
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.taskService.GetTaskById(id);
  }
  @Get('project/:projectId')
  getByProjectId(@Param('projectId') projectId: string) {
    return this.taskService.getTasksByProjectId(projectId);
  }
  @Get('user/:userId')
  getByUserId(@Param('userId') userId: string) {
    return this.taskService.getTasksByUserId(userId);
  }
  @Put('update/:id')
  updateTask(@Body() updatetask: UpdateTaskDTO, @Param('id') id: string) {
    return this.taskService.updateTask(id, updatetask);
  }
  @Delete('delete/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
