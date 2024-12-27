import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserAuthGuard } from 'src/userauth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWTSECRET,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserAuthGuard],
})
export class UsersModule {}
