import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginUserDto } from './DTOs/loginuser.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/login')
  async Login(@Body() loginDTO: LoginUserDto): Promise<string> {
    return await this.appService.Login(loginDTO);
  }
}
