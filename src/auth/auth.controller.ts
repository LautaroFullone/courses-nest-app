import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('register')
  register(@Body() registerBody: RegisterAuthDto) {
    return this.authService.handleRegister(registerBody);
  }

  @Post('login')
  login(@Body() loginBody: LoginAuthDto){
    return this.authService.handleLogin(loginBody);
  }
}
