import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configService } from './appconfig/config.service';
import { AppConfigModule } from './appconfig/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TaskModule } from './task/task.module';
import { Task } from './models/task.entity';
import { Project } from './models/project.entity';
import { User } from './models/user.entity';
import { join } from 'path';
import { ProjectModule } from './project/project.module';
import { dataSourceOptions } from './db/datasource';
import { UserAuthGuard } from './userauth.guard';
import { JwtModule } from '@nestjs/jwt';
import { configDotenv } from 'dotenv';
import { LoggerModule } from 'nestjs-pino';
import loggerConfig from 'logger.config';

configDotenv();
// ConfigModule is used to import or create the configurations
// like environment vairable and db configs. need to import from @nestjs/config module.
@Module({
  imports: [
    LoggerModule.forRoot(loggerConfig),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AppConfigModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    TaskModule,
    ProjectModule,
    UsersModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWTSECRET,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserAuthGuard],
})
export class AppModule {}
