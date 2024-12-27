import { IsNotEmpty } from 'class-validator';
import { LoginUserDto } from './loginuser.dto';

export class RegisterUserDTO extends LoginUserDto {
  @IsNotEmpty()
  teamName: string;
}
