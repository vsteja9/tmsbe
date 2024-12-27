import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { Task } from './task.entity';
@Entity('Project')
export class Project extends Base {
  @Column({
    nullable: false,
    unique: true,
  })
  name: string;
  @Column({
    nullable: true,
  })
  description: string;
  @Column({
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;
  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
