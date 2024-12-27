import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createProjectDTO, ProjectResponse } from 'src/DTOs/project.dto';
import { Project } from 'src/models/project.entity';
import { EntityManager, Repository } from 'typeorm';

//using entity manager method for database entry..
@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private readonly entityManager: EntityManager,
  ) {}
  async createProject(project: createProjectDTO) {
    try {
      let createdProject = new Project();
      createdProject.name = project.name;
      createdProject.description = project.description;
      const { id, name, description } =
        await this.entityManager.save(createdProject);
      return { id, name, description };
    } catch (err) {
      this.logger.error('occured error in creating project: ', err.message);
      throw err;
    }
  }

  async getProjects(): Promise<ProjectResponse[]> {
    const projects = await this.projectRepository.find({
      where: { isDeleted: false },
      relations: { tasks: true },
    });
    const filteredProjects = projects.map((obj) => {
      const { isDeleted, ...remaining } = obj;
      return remaining;
    });
    return filteredProjects;
  }
  async getProjectById(id: string) {
    try {
      const project = await this.projectRepository.findOne({
        where: { id },
        relations: { tasks: true },
      });
      if (!project) throw new HttpException('Project not found', 404);
      const { isDeleted, ...remaining } = project;
      return remaining;
    } catch (err) {
      this.logger.error('occured error in GetCall:', err.message);
      throw err;
    }
  }
  async updateProject(projectId: string, updateDTO: createProjectDTO) {
    try {
      const project = await this.projectRepository.findOne({
        where: { isDeleted: false, id: projectId },
      });
      if (!project)
        throw new HttpException(
          `Project is not found with givenId:${projectId}`,
          404,
        );
      project.name = updateDTO.name;
      project.description = updateDTO.description;
      project.lastChangedDateTime = new Date();
      await this.projectRepository.save(project);
    } catch (err) {
      this.logger.error('occured error in updateProject:', err.message);
      throw err;
    }
  }
  async deleteProject(projectId: string) {
    try {
      //this is hard delete
      //return await this.projectRepository.delete(projectId);
      // soft delete for it.
      const project = await this.projectRepository.findOneBy({ id: projectId });
      if (!project)
        throw new HttpException(
          `Project is not found with givenId:${projectId}`,
          404,
        );
      project.isDeleted = true;
      await this.projectRepository.save(project);
    } catch (err) {
      this.logger.error('occured error in delete Call:', err.message);
      throw err;
    }
  }
}
