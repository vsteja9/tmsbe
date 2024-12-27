import { Column } from 'typeorm/decorator/columns/Column';
import { Base } from './base.entity';
import { Entity, ManyToOne } from 'typeorm';
import { Project } from './project.entity';
import { User } from './user.entity';

export const enum TaskStatus {
  NOTSTARTED = 'notstarted',
  ANALYSIS = 'Analysis',
  DEV = 'Dev',
  QA = 'qa',
  DONE = 'done',
}
@Entity('Task')
export class Task extends Base {
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: true })
  description: string;
  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;
  @Column({ nullable: false, default: () => TaskStatus.NOTSTARTED })
  status: TaskStatus;
  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
