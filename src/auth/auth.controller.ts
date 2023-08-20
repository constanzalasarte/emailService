import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('signIn')
  signin(@Body() req: AuthDto) {
    return this.service.signin(req);
  }
  @Post('userSignUp')
  signup(@Body() req: AuthDto) {
    return this.service.signup(req, "USER");
  }

  @Post('adminSignUp')
  adminsignup(@Body() req: AuthDto) {
    return this.service.signup(req, "ADMIN");
  }
}
