import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { createProjectDTO, ProjectResponse } from 'src/DTOs/project.dto';
import { ProjectService } from './project.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/userauth.guard';

@Controller('projects')
@ApiBearerAuth()
@UseGuards(UserAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('/create')
  async CreateProject(@Body() project: createProjectDTO) {
    console.log('project dto', project);
    return this.projectService.createProject(project);
  }
  @Get('/all')
  async getAll(): Promise<ProjectResponse[]> {
    return await this.projectService.getProjects();
  }
  // this is only for updating of description
  @Patch('/update/:id')
  async update(@Param('id') id: string, @Body() updateDTO: createProjectDTO) {
    return this.projectService.updateProject(id, updateDTO);
  }
  @Delete('/delete/:id')
  async delete(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }
}
