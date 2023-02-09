import { Body, Controller, Post } from '@nestjs/common';
import CreateUserDto from 'src/users/dto/create-user.dto';
import { AuthenticationService } from './authentication.service';

@Controller('api/v1/authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() data: CreateUserDto) {
    return this.authenticationService.register(data);
  }
}
