import { config } from 'dotenv';
import { join } from 'path';
import { Project } from '../models/project.entity';
import { Task } from '../models/task.entity';
import { User } from '../models/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

// how to do migrations in the typeorm, if synchronize is true, it will automatically sync the
// code changes in the schema. if it is not migrations comes to picture..

//for migrations follow below steps:
// 1. create migrations folder and datasource file to create datasource object with db configs.
//2. use typeorm generate command to generate the migration file with javascript timestamp with schema latest changes.
// 3. run the typeorm command to apply that migration to db. and up method is excueted when running.
// 4. revert command to revert back the changes... (check the command in the package.json)

// finally the migrations are version control for the db changes.
// we can create empty migration by using command
// npx typeorm-ts-node-esm migration:create <location>
config();
export const dataSourceOptions: DataSourceOptions = {
  //enable when you are debugging db..
  //logging: true,
  url: process.env.DEPLOYEDURL,
  type: 'postgres',
  entities: [Project, Task, User],
  // directly we can specify the entity names or files location..
  //entities: [Task, Project, User],
  synchronize: false,
  migrationsTableName: 'migration',
  ssl: {
    rejectUnauthorized: false,
  },

  migrations: [join(__dirname, '../migration/*{.ts,.js}')],
  // don't use it in production, it will sync all your entities to the db.
  // synchronize: true,

  //   cli: {
  //     migrationsDir: 'src/migration',
  //   },

  //   ssl: this.isProduction(),
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
