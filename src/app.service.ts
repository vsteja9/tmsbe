import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRoles } from './models/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './DTOs/loginuser.dto';
import { configDotenv } from 'dotenv';
import * as jwt from 'jsonwebtoken';
configDotenv();
//nestjs passport also we can use for authentication,mostly similar functionality
// and we need to write the stategies class and validate in that stategies..
// need to write the custom guards as same..
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async Login(loginDTO: LoginUserDto) {
    const { email, password } = loginDTO;
    const existedUser = await this.userRepository.findOne({ where: { email } });
    if (!existedUser || existedUser.password !== password)
      throw new UnauthorizedException('Invalid Credentials');
    // generate token and send it.
    const token = this.generateJsonToken(
      existedUser.email,
      existedUser.role,
      existedUser.id,
      existedUser.name,
    );
    // write one private generatetoken method and write auth gaurds to check whether it has access or not...
    return token;
  }

  private generateJsonToken(
    email: string,
    role: UserRoles,
    userId: string,
    name: string,
  ) {
    const payload = { email, role, userId, name };
    const secret = process.env.JWTSECRET;
    const options = { expiresIn: '30m' };

    return jwt.sign(payload, secret, options);
  }
}
