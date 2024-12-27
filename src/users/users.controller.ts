import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from '../DTOs/create-user.dto';
import { UserAuthGuard } from 'src/userauth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('users')
@ApiBearerAuth()
@UseGuards(UserAuthGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/create')
  @ApiOperation({ description: 'Admins only can create the Users.' })
  createUsers(@Body() createUser: CreateUserDTO) {
    return this.userService.createUser(createUser);
  }

  @Get('/all')
  getUsers() {
    return this.userService.getAllUsers();
  }
  @Put('/update/:id')
  updateUser(@Param('id') id: string, @Body() updateUser: CreateUserDTO) {
    return this.userService.UpdateUser(id, updateUser);
  }
  @Delete('/delete/:id')
  DeleteUser(@Param('id') id: string) {
    return this.userService.DeleteUser(id);
  }
}
