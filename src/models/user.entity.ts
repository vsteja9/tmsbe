import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { Task } from './task.entity';

export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user',
}
@Entity('User')
export class User extends Base {
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false })
  role: UserRoles;
  @Column({ nullable: false, unique: true })
  email: string;
  @Column({ nullable: false })
  password: string;
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
