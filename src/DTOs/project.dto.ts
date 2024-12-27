import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class createProjectDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
  @IsString()
  @ApiProperty()
  description: string;
}

export class ProjectResponse {
  id: string;
  name: string;
  description: string;
  createDateTime: Date;
  lastChangedDateTime: Date;
}
