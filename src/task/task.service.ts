import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskDTO } from 'src/DTOs/task.dto';
import { UpdateTaskDTO } from 'src/DTOs/update-task.dto';
import { Project } from 'src/models/project.entity';
import { Task } from 'src/models/task.entity';
import { User } from 'src/models/user.entity';
import { ProjectService } from 'src/project/project.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

// using repository method to entry the data..
@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly userService: UsersService,
    private readonly projectService: ProjectService,
  ) {}
  async createTask(createTask: TaskDTO) {
    try {
      //need to create task
      const createdTask = new Task();
      //check the user and project details in db,if they are not throw the error.
      // automatically it is internally checking,if project and user is not found for given id it
      // is throwing error like foreign key vialation(great feature).
      //assign all the fields in the created task..
      createdTask.project = (await this.projectService.getProjectById(
        createTask.projectId,
      )) as Project;
      createdTask.user = (await this.userService.getUserById(
        createTask.userId,
      )) as User;
      createdTask.name = createTask.taskName;
      createdTask.description = createTask.taskDescription;
      // task status by default it is not started..
      //createdTask.status = createTask.status;
      //save the task obj
      return await this.taskRepository.save(createdTask);
    } catch (err) {
      this.logger.error('error occured while creating Task:', err.message);
      throw new HttpException(err.message, err.status);
    }
  }
  async GetAllTasks() {
    //due to eager:true, it is fetching all objects linked to it...
    return await this.taskRepository.find({
      relations: { project: true, user: true },
    });
  }
  async GetTaskById(taskId: string) {
    try {
      const task = await this.taskRepository.findOneBy({ id: taskId });
      if (!task) throw new HttpException('task not found', 404);
      return task;
    } catch (err) {
      this.logger.error('occured error in Get call:', err.message);
      throw err;
    }
  }
  async updateTask(taskId: string, updateTask: UpdateTaskDTO) {
    try {
      const existedTask = await this.GetTaskById(taskId);
      if (!existedTask)
        throw new HttpException(`no task is found with ${taskId}`, 404);
      existedTask.name = updateTask.taskName && updateTask.taskName;
      existedTask.description =
        updateTask.taskDescription && updateTask.taskDescription;
      existedTask.project = (await this.projectService.getProjectById(
        updateTask.projectId,
      )) as Project;
      existedTask.user = (await this.userService.getUserById(
        updateTask.userId,
      )) as User;
      existedTask.status = updateTask.status;
      return await this.taskRepository.save(existedTask);
    } catch (err) {
      this.logger.error('occured error in UpdateTask:', err.message);
      throw err;
    }
  }
  async getTasksByProjectId(projectId: string) {
    try {
      const projectLinkedTasks = await this.taskRepository.find({
        where: { project: { id: projectId } },
      });
      if (projectLinkedTasks.length === 0 || !projectLinkedTasks)
        throw new HttpException(
          `Tasks are not found for projectId:${projectId}`,
          404,
        );
      return projectLinkedTasks;
    } catch (err) {
      this.logger.error('occured error in Task:', err.message);
      throw err;
    }
  }
  async getTasksByUserId(userId: string) {
    try {
      const userLinkedTasks = await this.taskRepository.find({
        where: { user: { id: userId } },
      });
      if (userLinkedTasks.length === 0 || !userLinkedTasks)
        throw new HttpException(`Tasks not found for UserId:${userId}`, 404);
      return userLinkedTasks;
    } catch (err) {
      this.logger.log('occured error: ', err.message);
      throw err;
    }
  }
}
