import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import CreateAuthenticationDto from './dto/create-authentication.dto';

export class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}

  async register(data: CreateAuthenticationDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const createdUser = await this.usersService.newUsersData({
      ...data,
      password: hashedPassword,
    });
    createdUser.password = undefined;
    return createdUser;
  }

  async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
