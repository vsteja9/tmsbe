import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Certificate } from 'crypto';
import { CreateUserDTO } from 'src/DTOs/create-user.dto';
import { LoginUserDto } from 'src/DTOs/loginuser.dto';
import { RegisterUserDTO } from 'src/DTOs/registeruser.dto';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

// CreateUser(userCredentials: RegisterUserDTO) {
//   //during registration process
//   // use credentials and generate jwt token and return it.
//   // save the usercreds in data in the db
// }

// checkUserCredentials(userCred: LoginUserDto) {
//   //check the cred in db....
// }

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUser: CreateUserDTO) {
    try {
      // we can create User object in another way
      // const user1= await this.userRepository.create({
      //   ...createUser
      // })
      let user = new User();
      user.name = createUser.name;
      user.role = createUser.role;
      user.email = createUser.email;
      user.password = createUser.password;
      const { id, name, email, createDateTime, lastChangedDateTime, role } =
        await this.userRepository.save(user);
      this.logger.log('Successfully created the User.');
      return { id, name, email, createDateTime, lastChangedDateTime, role };
    } catch (error) {
      this.logger.error('occured error while creating user: ', error.message);
      throw new HttpException(error.message, 400);
    }
  }
  async getAllUsers() {
    try {
      const users = await this.userRepository.find();
      if (users) {
        const filteredUsers = users.map((obj) => {
          const { password, ...remaining } = obj;
          return remaining;
        });
        return filteredUsers;
      }
      return [];
    } catch (e) {
      this.logger.error('error occured in get Call: ', e.message);
      throw e;
    }
  }
  async getUserById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new HttpException('User not Found', 404);
    const { password, ...remaining } = user;
    return remaining;
  }
  async DeleteUser(id: string) {
    try {
      const deletedUser = await this.userRepository.delete(id);
      if (deletedUser.affected === 0)
        throw new HttpException('occured error while deleting', 500);
    } catch (err) {
      this.logger.error('occured Error in deleting User: ', err.message);
      throw err;
    }
  }
  async UpdateUser(id: string, updateDTO: CreateUserDTO) {
    try {
      const userToUpdate = await this.userRepository.findOneBy({ id: id });
      if (!userToUpdate) throw new HttpException('no User is found', 404);
      userToUpdate.email = updateDTO.email;
      userToUpdate.name = updateDTO.name;
      userToUpdate.role = updateDTO.role;
      userToUpdate.password = updateDTO.password;
      await this.userRepository.save(userToUpdate);
    } catch (err) {
      this.logger.error('error occured in updating the User: ', err.message);
      throw err;
    }
  }
}
